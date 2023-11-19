import { google } from 'googleapis';

import type { IFileStorage } from '../interfaces';

export function createGoogleDriveService (keyFilePath: string): IFileStorage {
  const auth = new google.auth.GoogleAuth({
    keyFile: keyFilePath,
    scopes: ['https://www.googleapis.com/auth/drive']
  });
  const drive = google.drive({ version: 'v3', auth });

  return {
    async create ({ name, body, destination = '', mimeType = '' }) {
      const { data } = await drive.files.create({
        requestBody: {
          name,
          parents: [destination]
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
