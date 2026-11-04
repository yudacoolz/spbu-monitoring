import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('photos') //<-- nama Tabel
export class Photo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  filename: string;

  @Column()
  url: string; // "http://localhost:9000/spbu-files/123.jpg"

  @Column()
  refid: string;

  @Column()
  mimetype: string; // jpg || png || jpeg

  @Column()
  size: number;

  @CreateDateColumn()
  createdAt: Date;
}
