import type { ATE } from '../ate';
import type { Response } from '../interfaces';
import type {
  EmailOptions,
  SendEmailRequestOptions,
  SendEmailResponse,
} from './interfaces';

export class Emails {
  constructor(private readonly ate: ATE) {}

  async send(
    payload: EmailOptions,
    options: SendEmailRequestOptions = {},
  ): Promise<SendEmailResponse> {
    let content: string;
    content = '';
    let contentType: 'html' | 'text';
    contentType = 'text';
    if (payload.html) {
      contentType = 'html';
      content = payload.html;
    } else if (payload.text) {
      contentType = 'text';
      content = payload.text;
    }

    if (!payload.attachments) payload.attachments = [];
    for (const i in payload.attachments) {
      payload.attachments[i].encoding = 'base64';
    }

    const data = await this.ate.post<Response>(
      '/send',
      {
        from: payload.from,
        to: payload.to,
        cc: payload.cc,
        bcc: payload.bcc,
        subject: payload.subject,
        replyTo: payload.reply_to,
        content: content,
        content_type: contentType,
        attachments: payload.attachments,
      },
      options,
    );
    return data;
  }
}
