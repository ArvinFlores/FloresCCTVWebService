import multer from 'multer';
import { Router } from 'express';
import { recordingController } from '../controllers/recording';

const recordingRoutes = Router();

recordingRoutes.post('/recordings', multer().single('file'), recordingController.createRecording);
recordingRoutes.get('/recordings', recordingController.getRecordings);
recordingRoutes.get('/recordings:id', recordingController.getRecording);
recordingRoutes.delete('/recordings/:id', recordingController.deleteRecording);

export { recordingRoutes };
