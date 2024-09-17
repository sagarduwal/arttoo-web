import { Injectable } from '@nestjs/common';
import { BosClient } from '@baiducloud/sdk';

@Injectable()
export class BceService {
  private client: BosClient;

  constructor() {
    this.client = new BosClient({
      endpoint: 'https://arttoo-waitlist.bj.bcebos.com', // 根据你的地域选择合适的 endpoint
      credentials: {
        ak: 'ALTAKY8hwvKBhhlWEvTQpUfG7X',
        sk: '0f0cde995099452d9f1395923d831652',
      },
    });
  }

  async uploadFileFromString(
    bucketName: string,
    fileName: string,
    fileContent: string,
  ): Promise<any> {
    return this.client.putObjectFromString(bucketName, fileName, fileContent);
  }

  async getFileAsString(bucketName: string, fileName: string): Promise<string> {
    const result = await this.client.getObject(bucketName, fileName);
    return result.body.toString();
  }
}
