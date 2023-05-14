import { v4 as uuidv4 } from 'uuid';
import fetch from "node-fetch";
import FormData from "form-data";
import { env } from "src/env/server.mjs";

const url = `https://api.cloudflare.com/client/v4/accounts/${env.CLOUDFLARE_ACCOUNT_ID}/images/v1`;

type CloudFlareImageResponse = {
  result: {
    id: string;
    filename: string;
    uploaded: string;
    requireSignedURLs: boolean;
    variants: string[];
  };
  success: boolean;
  errors: string[];
  messages: string[];
}

class CloudFlareImage {
  base64: string;
  mimeType: string;
  buffer: Buffer;
  savedUrl: string | undefined;

  constructor(base64: string) {
    this.base64 = base64;
    this.mimeType = this.#parseType();
    this.buffer = this.#base64ToBuffer();
  }

  #parseType(): string {
    const mimeTypeMatch = this.base64.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
    if (mimeTypeMatch === null || typeof mimeTypeMatch[1] !== "string") throw new Error('Invalid image');
    return mimeTypeMatch[1];
  }

  #base64ToBuffer(): Buffer {
    const base64Data = this.base64.split(',')
    if (base64Data === null || typeof base64Data[1] !== "string") throw new Error('Invalid image');
    const binaryData = atob(base64Data[1]);
    const dataArray = new Uint8Array(binaryData.length);
    for (let i = 0; i < binaryData.length; i++) {
      dataArray[i] = binaryData.charCodeAt(i);
    }
    return Buffer.from(base64Data[1], 'base64')
  }


  async upload(): Promise<CloudFlareImageResponse> {
    const formData = new FormData();
    await formData.append('file', this.buffer, `${uuidv4()}.${this.mimeType.split('/')[1]}`);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.CLOUDFLARE_API_TOKEN}`,
      },
      body: formData,
    });
    if (response.ok) {
      const responseJson = await response.json();
      if (responseJson === null || responseJson === undefined) throw new Error('Error on image upload');
      return responseJson as CloudFlareImageResponse;
    }
    throw new Error(response.statusText);
  }
}

export { CloudFlareImage };

