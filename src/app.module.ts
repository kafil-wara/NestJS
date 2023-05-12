import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { User } from './admin/adminentity.entity';
import { ProductionhouseModule } from './productionhouse/productionhousemodule.module';
import { VideoModule } from './video/video.module';

@Module({
  imports: [AdminModule, ProductionhouseModule, VideoModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'containers-us-west-21.railway.app',
    port: 6856,
    username: 'postgres',
    password: 'P5MlKcUIc7iZ7vqa6tE2',
    database: 'railway',
    autoLoadEntities: true,
    synchronize: true,
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


/*

*/