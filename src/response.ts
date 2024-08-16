import type { SuccessData, Response } from './interfaces';

export class ResponseError extends Error {
  public readonly code: number;
  public readonly detail: string | undefined;

  constructor(message: string, code: number, detail: string | undefined) {
    super();
    this.message = message;
    this.code = code;
    this.detail = detail;
  }

  public static fromResponse(response: Response) {
    return new ResponseError(response.msg, response.code, response.error?.msg);
  }
}

export class ResponseSuccess {
  public readonly code: number;
  public readonly data: SuccessData | undefined;
  public readonly message: string;

  constructor(message: string, code: number, data: SuccessData | undefined) {
    this.message = message;
    this.code = code;
    this.data = data;
  }

  public static fromResponse(response: Response) {
    return new ResponseSuccess(response.msg, response.code, response.data);
  }
}
