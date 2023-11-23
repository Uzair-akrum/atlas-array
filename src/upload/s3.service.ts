import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {
  private s3 = new S3();
  constructor(private readonly configService: ConfigService) {
    this.s3 = new S3({
      accessKeyId: this.configService.get('ACESSKEY'),
      secretAccessKey: this.configService.get('SECRETACESSKEY'),
    });
  }

  async uploadToS3(originalname, buffer): Promise<any> {
    try {
      const uploadParams: S3.Types.PutObjectRequest = {
        Bucket: this.configService.get('BUFFERNAME'),
        Key: originalname,
        Body: buffer,
      };
      const url = await this.s3.upload(uploadParams).promise();
      console.log(
        '🚀 ~ file: s3.service.ts:24 ~ S3Service ~ uploadToS3 ~ url:',
        url,
      );
      return url;
    } catch (err) {
      return err;
    }
  }
}
