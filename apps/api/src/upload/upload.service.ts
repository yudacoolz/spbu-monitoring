// upload/upload.service.ts
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { MinioService } from './minio.service';
import { Photo } from './entities/photo.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UploadService extends Repository<Photo> {
  private readonly logger = new Logger(UploadService.name);

  constructor(
    private readonly minioService: MinioService,
    private readonly dataSource: DataSource,
  ) {
    super(Photo, dataSource.createEntityManager());
  }

  async upload(
    file: Express.Multer.File,
    refid: string,
    title: string,
  ): Promise<Photo> {
    // 1. Upload ke MinIO → dapat URL
    const url = await this.minioService.uploadFile(file, `${refid}`);

    // 2. Simpan URL ke PostgreSQL
    const photo = this.create({
      filename: file.originalname,
      url,
      refid: refid,
      size: file.size,
      mimetype: file.mimetype,
    });

    return this.save(photo);
  }

  async uploadMany(
    files: Express.Multer.File[],
    refid: string,
    title: string,
  ): Promise<Photo[]> {
    const photos = await Promise.all(
      files.map(async (file) => {
        const url = await this.minioService.uploadFile(file, `${refid}`);
        this.logger.log('url gallery : ', url);

        const photo = this.create({
          filename: file.originalname,
          url,
          refid,
          size: file.size,
          mimetype: file.mimetype,
        });

        return this.save(photo);
      }),
    );

    return photos;
  }

  async deletePhotoById(id: string): Promise<void> {
    const photo = await this.findOneOrFail({ where: { id } });

    // Ekstrak object name dari URL
    const objectName = this.extractObjectName(photo.url);

    // 1. Hapus dari MinIO
    await this.minioService.deleteFile(objectName);

    // 2. Hapus dari PostgreSQL
    await this.delete(id);
  }

  async deletePhotoByType(refid: string): Promise<void> {
    const photos = await this.find({
      where: {
        refid,
      },
    });

    await Promise.all(
      photos.map(async (photo) => {
        const objectName = this.extractObjectName(photo.url);
        await this.minioService.deleteFile(objectName);
        await this.delete(photo.id);
      }),
    );
  }

  async deletePhotoByRef(refid: string): Promise<void> {
    const photos = await this.find({
      where: {
        refid,
      },
    });

    await Promise.all(
      photos.map(async (photo) => {
        const objectName = this.extractObjectName(photo.url);
        await this.minioService.deleteFile(objectName);
        await this.delete(photo.id);
      }),
    );
  }

  async getCover(refid: string): Promise<Photo | null> {
    const photo = await this.findOne({
      where: {
        refid,
      },
      order: { createdAt: 'DESC' },
    });

    return photo;
  }

  async getGallery(refid: string): Promise<Photo[]> {
    return this.find({
      where: {
        refid,
      },
      order: { createdAt: 'ASC' },
    });
  }

  private extractObjectName(url: string): string {
    const urlObj = new URL(url);
    return decodeURIComponent(urlObj.pathname).replace(
      `/${this.minioService.getBucketName()}/`,
      '',
    );
  }
}
