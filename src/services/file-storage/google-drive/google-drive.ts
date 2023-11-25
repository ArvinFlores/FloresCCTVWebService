import { google } from 'googleapis';
import type { FileStorage } from 'florescctvwebservice-types';
import { getConfigPath } from '../../../util/get-config-path';
import { commonFields } from './constants';
import { createStoredFile } from './helpers';

export function createGoogleDriveService ({ destinationDir }: FileStorage.ClientOptions): FileStorage.Actions {
  const auth = new google.auth.GoogleAuth({
    keyFile: `${getConfigPath()}/google_service.json`,
    scopes: ['https://www.googleapis.com/auth/drive']
  });
  const drive = google.drive({ version: 'v3', auth });

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
        q: `'${destinationDir}' in parents`,
        fields: `files(${commonFields.join(', ')})`,
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
