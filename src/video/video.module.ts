import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoEntity } from './video.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VideoEntity])],
  controllers: [],
  providers: [],
})
export class VideoModule {}
