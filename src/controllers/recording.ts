import { Readable } from 'stream';
import type { RequestHandler } from 'express';
import type { FileStorage } from 'florescctvwebservice-types';
import { createGoogleDriveService } from '../services/file-storage';

function createRecordingController (fileStorage: FileStorage.Actions): Record<
'createRecording' |
'deleteRecording' |
'getRecording' |
'getRecordings',
RequestHandler
> {
  return {
    async createRecording (req, res, next) {
      try {
        if (!req.file) {
          return res.status(422).json({
            code: 422,
            message: 'A file is required'
          });
        }

        const recording = await fileStorage.create({
          name: req.file.originalname,
          body: Readable.from(req.file.buffer),
          mimeType: req.file.mimetype
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

const fileStorage = createGoogleDriveService({ destinationDir: process.env.FILE_STORAGE_DIR ?? '' });
export const recordingController = createRecordingController(fileStorage);
