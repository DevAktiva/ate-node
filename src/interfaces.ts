export interface PostOptions {
  data?: { [key: string]: unknown };
}

export interface ErrorData {
  msg: string;
}

export interface SuccessData {
  id: string;
  from: string;
  to: string[];
}

export interface Response {
  status: string;
  code: number;
  msg: string;
  data?: SuccessData;
  error?: ErrorData;
}

export type RequireAtLeastOne<T> = {
  [K in keyof T]-?: Required<Pick<T, K>> &
    Partial<Pick<T, Exclude<keyof T, K>>>;
}[keyof T];
