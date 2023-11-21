import type { drive_v3 } from 'googleapis';
import type { FileStorage } from 'florescctvwebservice-types';

export function createStoredFile (file: drive_v3.Schema$File): FileStorage.File {
  return {
    id: file.id ?? '',
    name: file.name ?? '',
    thumbnail: file.thumbnailLink ?? '',
    src: file.webViewLink ?? '',
    created_at: file.createdTime ?? ''
  };
}
