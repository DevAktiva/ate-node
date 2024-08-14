import { Emails } from './emails/emails';
import type { PostOptions, Response } from './interfaces';

const defaultBaseUrl = 'https://api-transaksional.aktiva.co.id/app/v1';
const baseUrl =
  typeof process !== 'undefined' && process.env
    ? process.env.RESEND_BASE_URL || defaultBaseUrl
    : defaultBaseUrl;

export class ATE {
  private readonly headers: Headers;

  readonly emails = new Emails(this);

  constructor(readonly key?: string) {
    if (!key) {
      if (typeof process !== 'undefined' && process.env) {
        this.key = process.env.ATE_API_KEY;
      }

      if (!this.key) {
        throw new Error(
          'Missing API key. Pass it to the constructor `new ATE("<api_key>")`',
        );
      }
    }

    this.headers = new Headers({
      Authorization: `Bearer ${this.key}`,
      'Content-Type': 'application/json',
    });
  }

  private async defRequest<T>(
    path: string,
    options = {},
  ): Promise<{ data: T | null; error: Response | null }> {
    try {
      const response = await fetch(`${baseUrl}${path}`, options);
      if (!response.ok) {
        try {
          const errorResponse = await response.text();
          return { data: null, error: JSON.parse(errorResponse) };
        } catch (error) {
          if (error instanceof SyntaxError) {
            return {
              data: null,
              error: {
                code: 500,
                msg: 'Internal server error, please try again or contact support',
                status: 'failed',
              },
            };
          }

          const err: Response = {
            msg: response.statusText,
            code: 500,
            status: 'failed',
          };

          if (error instanceof Error) {
            return {
              data: null,
              error: {
                code: 500,
                msg: error.message,
                status: 'failed',
              },
            };
          }

          return { data: null, error: err };
        }
      }

      const data = await response.json();
      return { data, error: null };
    } catch (error) {
      return {
        data: null,
        error: {
          status: 'failed',
          code: 500,
          msg: 'Unable to fetch the data',
        },
      };
    }
  }

  async post<T>(path: string, data: unknown, options: PostOptions = {}) {
    const requestOptions = {
      method: 'post',
      headers: this.headers,
      body: JSON.stringify(data),
      ...options,
    };
    return this.defRequest<T>(path, requestOptions);
  }
}