import path from 'path';

export function getConfigPath (): string {
  return path.join(__dirname, '../../config');
}
