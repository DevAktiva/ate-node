import type { PostOptions, RequireAtLeastOne, Response } from '../interfaces';

interface RenderOptions {
  html: string;
  text: string;
}

interface EmailBaseOptions {
  attachments?: Attachment[];
  bcc?: string[];
  cc?: string[];
  from: string;
  reply_to?: string;
  subject: string;
  to: string | string[];
}

interface Attachment {
  content?: string | Buffer;
  filename?: string | undefined;
  encoding?: 'base64';
  // todo: support attachment for this type
  // path?: string;
  // content_type?: string;
}

export type EmailOptions = RequireAtLeastOne<RenderOptions> & EmailBaseOptions;

export interface SendEmailRequestOptions extends PostOptions {}

export interface SendEmailResponse {
  data: Response | null;
  error: Response | null;
}
