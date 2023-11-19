import type { Request, Response } from 'express';

export function apiErrorResponse (error: unknown, _: Request, res: Response, __: Function) {
  const isErrorLike = typeof error === 'object' && error !== null;
  const code = isErrorLike && 'code' in error && typeof error.code === 'number' ? error.code : 400;
  const message = isErrorLike && 'message' in error ? error.message : 'An unknown error occurred';

  res.status(code).json({ code, message });
}
