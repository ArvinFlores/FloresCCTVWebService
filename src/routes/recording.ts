import multer from 'multer';
import { Router } from 'express';
import { recordingController } from '../controllers/recording';

const recordingRoutes = Router();

recordingRoutes.post('/', multer().single('file'), recordingController.createRecording);
recordingRoutes.get('/', recordingController.getRecordings);
recordingRoutes.get('/:id', recordingController.getRecording);
recordingRoutes.delete('/:id', recordingController.deleteRecording);

export { recordingRoutes };
