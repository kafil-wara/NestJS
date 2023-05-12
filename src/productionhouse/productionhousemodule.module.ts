import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductionhouseController } from './productionhouse.controller';
import { ProductionhouseService } from './productionhouseservice.service';
import { ProductionhouseEntity } from './productionhouseentity.entity';
import { VideoService } from 'src/video/video.service';
import { VideoEntity } from 'src/video/video.entity';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        ignoreTLS: true,
        secure: true,
        auth: {
          user: 'your email address',
          pass: 'your app password',
        },
      },
    }),

    TypeOrmModule.forFeature([ProductionhouseEntity, VideoEntity]),
  ],
  controllers: [ProductionhouseController],
  providers: [ProductionhouseService, VideoService],
})
export class ProductionhouseModule {}
