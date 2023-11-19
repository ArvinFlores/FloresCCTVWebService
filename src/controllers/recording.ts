import { createGoogleDriveService } from '../services/file-storage';
import type { IFileStorage } from '../services/file-storage/interfaces';
import type { RequestHandler } from 'express';

function createRecordingController (fileStorage: IFileStorage): Record<
'createRecording' |
'deleteRecording' |
'getRecording' |
'getRecordings',
RequestHandler
> {
  return {
    async createRecording (req, res, next) {
      try {
        const {
          name,
          body,
          mimeType
        } = req.body;
        const recording = await fileStorage.create({
          name,
          body,
          mimeType
        });

        return res.json(recording);
      } catch (e) {
        next(e);
      }
    },
    async deleteRecording (req, res, next) {
      try {
        const fileId = req.params.id;
        const deleted = await fileStorage.delete(fileId);

        return res.json(deleted);
      } catch (e) {
        next(e);
      }
    },
    async getRecording (req, res, next) {
      try {
        const fileId = req.params.id;
        const recording = await fileStorage.get(fileId);

        return res.json(recording);
      } catch (e) {
        next(e);
      }
    },
    async getRecordings (req, res, next) {
      try {
        const sortKey = req.query['sort-key'];
        const sortOrder = req.query['sort-order'];
        const pageSize = req.query['page-size'];
        const recordings = await fileStorage.getAll({
          sortKey: sortKey === 'create_date' ? sortKey : 'create_date',
          sortOrder: sortOrder === 'asc' || sortOrder === 'desc' ? sortOrder : 'desc',
          pageSize: pageSize != null && pageSize > '0' ? Number(pageSize) : 10
        });

        return res.json(recordings);
      } catch (e) {
        next(e);
      }
    }
  };
}

const fileStorage = createGoogleDriveService({ destinationDir: '1YFg9KMYjeFQXqNTdvcwoVJ4jU_O3H3El' });
export const recordingController = createRecordingController(fileStorage);
