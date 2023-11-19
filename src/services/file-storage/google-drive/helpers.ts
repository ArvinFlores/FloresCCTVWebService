import type { drive_v3 } from 'googleapis';
import type { StoredFile } from '../interfaces';

export function createStoredFile (file: drive_v3.Schema$File): StoredFile {
  return {
    id: file.id ?? '',
    name: file.name ?? '',
    thumbnail: file.thumbnailLink ?? '',
    src: file.webViewLink ?? '',
    created_at: file.createdTime ?? ''
  };
}
