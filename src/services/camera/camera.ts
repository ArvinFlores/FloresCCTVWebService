import { simpleHttpClient } from '../simple-http-client';
import type { CameraServiceOpts, ICameraService } from './interfaces';

function createCameraService ({
  httpClient,
  ips
}: CameraServiceOpts): ICameraService {
  return {
    cameras: {
      async getHealth () {
        const res = await Promise.all(ips.map(ip => {
          return httpClient.get(`https://${ip}:9000/health.json`, { rejectUnauthorized: false });
        }));

        return res.map(r => r.json());
      }
    }
  };
}

export const cameraService = createCameraService({
  httpClient: simpleHttpClient,
  ips: process.env.CAMERA_IPS.split(',')
});
