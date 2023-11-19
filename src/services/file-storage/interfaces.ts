import type { ReadStream } from 'fs';

interface CreateOptions {
  name: string;
  body: ReadStream;
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
}
