import https from 'https';
import http from 'http';
import { ServerError } from '../../errors/server-error';
import type {
  ISimpleHttpClient,
  SimpleHttpClientResult,
  BaseRequestOpts
} from './interfaces';

function createSimpleHttpClient (): ISimpleHttpClient {
  const baseRequest = async (url: string, opts?: BaseRequestOpts): Promise<SimpleHttpClientResult> => {
    const pkg = url.startsWith('https') ? https : http;
    const {
      hostname: host,
      pathname: path,
      port,
      protocol
    } = new URL(url);

    return await new Promise((resolve, reject) => {
      const request = pkg.request(
        {
          ...opts,
          timeout: opts?.timeout ?? 5000,
          protocol,
          host,
          port,
          path
        },
        (res) => {
          let output = '';
          res.setEncoding('utf-8');
          res.on('data', (chunk) => {
            output += chunk;
          });
          res.on('end', () => {
            if (res.statusCode !== 200) {
              reject(new ServerError(
                res.statusMessage ?? 'An unknown error occurred',
                res.statusCode ?? 400
              ));
            } else {
              resolve({
                json: () => JSON.parse(output),
                text: () => output
              });
            }
          });
        }
      );

      request.on('error', reject);

      request.on('timeout', () => {
        reject(new ServerError('The connection timed out', 504));
      });

      request.end();
    });
  };

  return {
    async get (url, opts) {
      return await baseRequest(url, { ...opts, method: 'GET' });
    }
  };
}

export const simpleHttpClient = createSimpleHttpClient();
