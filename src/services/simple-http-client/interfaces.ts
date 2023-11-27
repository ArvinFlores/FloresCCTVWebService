import type { RequestOptions } from 'https';

export type BaseRequestOpts = Pick<
RequestOptions,
'method' |
'headers' |
'rejectUnauthorized' |
'timeout'
>;

type RequestOpts = Omit<BaseRequestOpts, 'method'>;

export interface SimpleHttpClientResult {
  json: <Data>() => Data;
  text: () => string;
}

export interface ISimpleHttpClient {
  get: (url: string, opts?: RequestOpts) => Promise<SimpleHttpClientResult>;
}
