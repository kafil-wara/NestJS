import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VideoForm } from './video.dto';

import { VideoEntity } from './video.entity';

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(VideoEntity)
    private videoRepo: Repository<VideoEntity>,
  ) {}

  insertVideo(mydto: VideoForm): any {
    return this.videoRepo.save(mydto);
  }
  getProductionhouseByVideoID(id): any {
    return this.videoRepo.find({
      where: { id: id },
      relations: {
        productionhouse: true,
      },
    });
  }
}
