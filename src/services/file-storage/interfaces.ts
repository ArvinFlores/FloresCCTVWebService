import type { ReadStream } from 'fs';

interface CreateOptions {
  name: string;
  body: ReadStream;
  destination: string;
  mimeType: string;
}

interface CreateSuccess {
  id: string;
  filename: string;
  created_at: string;
}

export interface IFileStorage {
  create: (options: CreateOptions) => Promise<CreateSuccess>;
}
