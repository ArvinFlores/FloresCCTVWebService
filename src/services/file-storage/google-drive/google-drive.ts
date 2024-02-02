import { google } from 'googleapis';
import { batchFetchImplementation } from '@jrmdayn/googleapis-batcher';
import type { FileStorage } from 'florescctvwebservice-types';
import { getConfigPath } from '../../../util/get-config-path';
import { commonFields } from './constants';
import { createStoredFile, buildDriveQuery } from './helpers';

export function createGoogleDriveService ({ destinationDir }: FileStorage.ClientOptions): FileStorage.Actions {
  const auth = new google.auth.GoogleAuth({
    keyFile: `${getConfigPath()}/google_service.json`,
    scopes: ['https://www.googleapis.com/auth/drive']
  });
  const drive = google.drive({
    version: 'v3',
    auth,
    fetchImplementation: batchFetchImplementation({ maxBatchSize: 100 })
  });

  return {
    async create ({ name, body, mimeType }) {
      const { data } = await drive.files.create({
        requestBody: {
          name,
          parents: [destinationDir]
        },
        media: {
          mimeType,
          body
        },
        fields: 'id'
      });

      await drive.permissions.create({
        fileId: data.id ?? '',
        requestBody: {
          type: 'anyone',
          role: 'reader'
        }
      });

      return await Promise.resolve({
        id: data.id ?? '',
        filename: name,
        created_at: new Date().toISOString()
      });
    },
    async delete (fileId) {
      await drive.files.delete({ fileId });

      return await Promise.resolve({
        id: fileId,
        deleted_at: new Date().toISOString()
      });
    },
    async deleteAll (query) {
      let deleted = 0;
      const {
        start_date: startDate,
        end_date: endDate
      } = query;
      const q = buildDriveQuery({
        parentFolderId: destinationDir,
        start_date: startDate,
        end_date: endDate
      });
      const { data } = await drive.files.list({
        q,
        pageSize: 100
      });
      const files = data.files ?? [];

      if (files.length > 0) {
        let nextPageToken = data.nextPageToken;

        await Promise.all(files.map(async (file) => await drive.files.delete({ fileId: file.id ?? '' })));
        deleted += files.length;

        while (nextPageToken != null) {
          const response = await drive.files.list({
            q,
            pageSize: 100,
            pageToken: nextPageToken
          });

          if (response.data.files) {
            await Promise.all(
              response.data.files.map(async (file) => await drive.files.delete({
                fileId: file.id ?? ''
              }))
            );
          }

          deleted += response.data.files?.length ?? 0;
          nextPageToken = response.data.nextPageToken;
        }
      }

      return await Promise.resolve({
        deleted,
        deleted_at: new Date().toISOString()
      });
    },
    async get (fileId) {
      const { data } = await drive.files.get({
        fileId,
        fields: commonFields.join(',')
      });

      return await Promise.resolve(createStoredFile(data));
    },
    async getAll ({ sortKey, sortOrder, pageSize, pageToken }) {
      const sortKeyMappings = {
        create_date: 'createdTime'
      };
      const { data } = await drive.files.list({
        pageSize,
        pageToken,
        q: buildDriveQuery({ parentFolderId: destinationDir }),
        fields: `files(${commonFields.join(', ')}),nextPageToken`,
        orderBy: [
          sortKeyMappings[sortKey] || '',
          sortOrder === 'desc' ? sortOrder : ''
        ].join(' ').trim()
      });

      return await Promise.resolve({
        files: data.files?.map(createStoredFile) ?? [],
        nextPageToken: data.nextPageToken
      });
    }
  };
}
