import { google } from 'googleapis';
import { getConfigPath } from '../../../util/get-config-path';
import type { IFileStorageOptions, IFileStorage } from '../interfaces';

export function createGoogleDriveService ({ destinationDir }: IFileStorageOptions): IFileStorage {
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
      const fields = [
        'id',
        'name',
        'thumbnailLink',
        'webViewLink',
        'createdTime'
      ].join(',');
      const { data } = await drive.files.get({
        fileId,
        fields
      });

      return await Promise.resolve({
        id: data.id ?? '',
        name: data.name ?? '',
        thumbnail: data.thumbnailLink ?? '',
        src: data.webViewLink ?? '',
        created_at: data.createdTime ?? ''
      });
    }
  };
}
