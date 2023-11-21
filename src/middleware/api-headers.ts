import type { Request, Response, NextFunction } from 'express';

export function apiHeaders (_: Request, res: Response, next: NextFunction): void {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
}
