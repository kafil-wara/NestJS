import { ProductionhouseEntity } from 'src/productionhouse/productionhouseentity.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('video')
export class VideoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(
    () => ProductionhouseEntity,
    (productionhouse) => productionhouse.videos,
  )
  productionhouse: ProductionhouseEntity;
}
