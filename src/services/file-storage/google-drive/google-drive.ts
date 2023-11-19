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
    }
  };
}
