export class ServerError extends Error {
  code: number;

  constructor (message: string, code: number) {
    super(message);
    this.name = 'ServerError';
    this.code = code;
  }
}
