import { Router } from 'express';
import { cameraController } from '../controllers/camera';

const cameraRoutes = Router();

cameraRoutes.get('/cameras/health', cameraController.getAllHealth);

export { cameraRoutes };
