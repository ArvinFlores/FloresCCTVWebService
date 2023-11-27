declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | undefined;
      APP_ENV: 'dev' | 'prod';
      FILE_STORAGE_DIR: string;
      CAMERA_IPS: string;
      CERT_KEY?: string;
      CERT_FILE?: string;
      PORT?: string;
    }
  }
}
export {};
