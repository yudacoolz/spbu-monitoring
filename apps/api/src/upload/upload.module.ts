import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
// import { UploadController } from './upload.controller';
import { MinioService } from './minio.service';

@Module({
  // controllers: [UploadController],
  providers: [UploadService, MinioService],
})
export class UploadModule {}
