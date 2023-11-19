import { Router } from 'express';
import { recordingController } from '../controllers/recording';

const recordingRoutes = Router();

recordingRoutes.post('/', recordingController.createRecording);
recordingRoutes.get('/', recordingController.getRecordings);
recordingRoutes.get('/:id', recordingController.getRecording);
recordingRoutes.delete('/:id', recordingController.deleteRecording);

export { recordingRoutes };
