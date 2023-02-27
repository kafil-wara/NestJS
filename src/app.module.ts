import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [AdminModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


/*
TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'bdflix',
  entities: [],
  synchronize: true,
})
*/