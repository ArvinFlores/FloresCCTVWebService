import { Camera } from 'florescctvwebservice-types';
import type { ISimpleHttpClient } from '../simple-http-client/interfaces';

interface MultiMethods {
  getHealth: () => Promise<Camera.Health[]>;
}

export interface CameraServiceOpts {
  httpClient: ISimpleHttpClient;
  ips: string[];
}

export interface ICameraService {
  cameras: MultiMethods;
}
