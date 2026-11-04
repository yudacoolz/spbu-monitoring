import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import * as Minio from 'minio';
// import { minioConfig } from '../config/minio.config';
import { Readable } from 'stream';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';

@Injectable()
export class MinioService implements OnModuleInit {
  private readonly logger = new Logger(MinioService.name);
  private client: Minio.Client;
  private readonly bucket: string;
  private readonly publicBaseUrl: string;

  constructor(private readonly config: ConfigService) {
    const endPoint = this.config.getOrThrow<string>('MINIO_ENDPOINT');
    const port = Number(this.config.getOrThrow<string>('MINIO_PORT'));
    const useSSL = this.config.get<string>('MINIO_USE_SSL') === 'true';

    this.client = new Minio.Client({
      endPoint,
      port,
      useSSL,
      accessKey: this.config.getOrThrow<string>('MINIO_ACCESS_KEY'),
      secretKey: this.config.getOrThrow<string>('MINIO_SECRET_KEY'),
    });

    this.bucket = this.config.getOrThrow<string>('MINIO_BUCKET');
    const baseUrl = (
      this.config.get<string>('MINIO_PUBLIC_BASE_URL') ?? ''
    ).trim();
    this.publicBaseUrl = baseUrl
      ? baseUrl.replace(/\/+$/, '')
      : `${useSSL ? 'https' : 'http'}://${endPoint}:${port}/${this.bucket}`;
  }

  // Auto-create bucket saat app start
  async onModuleInit() {
    const exists = await this.client.bucketExists(this.bucket);
    if (!exists) {
      await this.client.makeBucket(this.bucket);
      this.logger.log(`Bucket "${this.bucket}" created`);

      // Set bucket policy: public read
      await this.client.setBucketPolicy(
        this.bucket,
        JSON.stringify({
          Version: '2012-10-17',
          Statement: [
            {
              Effect: 'Allow',
              Principal: { AWS: ['*'] },
              Action: ['s3:GetObject'],
              Resource: [`arn:aws:s3:::${this.bucket}/*`],
            },
          ],
        }),
      );
    }
  }

  // Upload file ke MinIO
  async uploadFile(file: Express.Multer.File, folder: string): Promise<string> {
    // const filename = `${folder}/${Date.now()}-${Math.round(Math.random() * 1e9)}${this.getExtension(file.originalname)}`;
    const filename = `${folder}/${randomUUID().substring(0, 8)}-${file.originalname}`;

    await this.client.putObject(
      this.bucket,
      filename,
      file.buffer, // ← pakai memoryStorage, bukan diskStorage
      file.size,
      { 'Content-Type': file.mimetype },
    );

    return `${this.publicBaseUrl}/${filename}`;
  }

  getBucketName(): string {
    return this.bucket;
  }

  // Delete file
  async deleteFile(objectName: string): Promise<void> {
    await this.client.removeObject(this.bucket, objectName);
  }
}
