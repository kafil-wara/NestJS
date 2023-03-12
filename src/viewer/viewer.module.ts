import { Module } from "@nestjs/common";
import { ViewerController } from "./viewer.controller"
import { ViewerService } from "./viewerservice.service"
import { TypeOrmModule } from "@nestjs/typeorm"
import { User } from "./viewerentity.entity"
import { MailerModule } from '@nestjs-modules/mailer';

@Module({

    imports:[TypeOrmModule.forFeature([User, ])],
    controllers:[ViewerController],
    providers:  [ViewerService, ]

})

export class ViewerModule {}