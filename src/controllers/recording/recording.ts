import { Readable } from 'stream';
import type { RequestHandler } from 'express';
import type { FileStorage } from 'florescctvwebservice-types';
import { createGoogleDriveService } from '../../services/file-storage';
import { isEmptyObject } from '../../util/is-empty-object';
import { validateDeleteAllQuery } from './helpers';

function createRecordingController (fileStorage: FileStorage.Actions): Record<
'createRecording' |
'deleteRecording' |
'deleteRecordings' |
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
    async deleteRecordings (req, res, next) {
      try {
        const q = req.query;

        if (q == null || isEmptyObject(q)) {
          return res.status(422).json({
            code: 422,
            message: 'A valid url parameter(s) was not provided'
          });
        }

        const error = validateDeleteAllQuery(q);

        if (error != null) {
          return res.status(422).json({
            code: 422,
            message: error
          });
        }

        const deleted = await fileStorage.deleteAll(q);
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
        const pageToken = req.query['page-token'];
        const recordings = await fileStorage.getAll({
          sortKey: sortKey === 'create_date' ? sortKey : 'create_date',
          sortOrder: sortOrder === 'asc' || sortOrder === 'desc' ? sortOrder : 'desc',
          pageSize: pageSize != null && pageSize > '0' ? Number(pageSize) : 10,
          pageToken: typeof pageToken === 'string' ? pageToken : undefined
        });

        return res.json(recordings);
      } catch (e) {
        next(e);
      }
    }
  };
}

const fileStorage = createGoogleDriveService({ destinationDir: process.env.FILE_STORAGE_DIR });
export const recordingController = createRecordingController(fileStorage);
