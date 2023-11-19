import type { Readable } from 'stream';

export interface StoredFile {
  id: string;
  name: string;
  thumbnail: string;
  src: string;
  created_at: string;
}

interface GetAllOptions {
  sortKey: 'create_date';
  sortOrder: 'asc' | 'desc';
  pageSize: number;
  pageToken?: string;
}

interface GetAllSuccess {
  files: StoredFile[];
  nextPageToken?: string | null;
}

interface CreateOptions {
  name: string;
  body: Readable;
  mimeType?: string;
}

interface CreateSuccess {
  id: string;
  filename: string;
  created_at: string;
}

interface DeleteSuccess {
  id: string;
  deleted_at: string;
}

export interface IFileStorageOptions {
  destinationDir: string;
}

export interface IFileStorage {
  create: (options: CreateOptions) => Promise<CreateSuccess>;
  delete: (fileId: string) => Promise<DeleteSuccess>;
  get: (fileId: string) => Promise<StoredFile>;
  getAll: (options: GetAllOptions) => Promise<GetAllSuccess>;
}
