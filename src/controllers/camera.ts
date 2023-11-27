import type { RequestHandler } from 'express';
import { cameraService } from '../services/camera';
import type { ICameraService } from '../services/camera/interfaces';

function createCameraController ({ cameras }: ICameraService): Record<
'getAllHealth',
RequestHandler
> {
  return {
    async getAllHealth (_, res, next) {
      try {
        const results = await cameras.getHealth();
        return res.json(results);
      } catch (e) {
        next(e);
      }
    }
  };
}

export const cameraController = createCameraController(cameraService);
