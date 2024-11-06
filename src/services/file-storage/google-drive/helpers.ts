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

export function buildDriveQuery ({
  parentFolderId,
  start_date: startDate,
  end_date: endDate
}: {
  parentFolderId?: string;
  start_date?: string;
  end_date?: string;
}): string {
  const query: string[] = [];

  if (parentFolderId != null) {
    query.push(`'${parentFolderId}' in parents`);
  }

  if (startDate != null && endDate != null) {
    query.push(`createdTime > '${startDate}' and createdTime < '${endDate}'`);
  }

  if (!query.length) {
    return '';
  }

  return query.join(' and ');
}
