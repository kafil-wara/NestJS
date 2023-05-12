import { VideoEntity } from 'src/video/video.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('productionhouse')
export class ProductionhouseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  address: string;

  @Column()
  filename: string;

  @OneToMany(() => VideoEntity, (video) => video.productionhouse)
  videos: VideoEntity[];
}
