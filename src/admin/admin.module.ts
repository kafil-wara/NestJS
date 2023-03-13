import { Module } from "@nestjs/common";
import { AdminController } from "./admin.controller"
import { AdminService } from "./adminservice.service"
import { TypeOrmModule } from "@nestjs/typeorm"
import { User } from "./adminentity.entity"
import { MailerModule } from '@nestjs-modules/mailer';

@Module({

    imports: [MailerModule.forRoot({
        transport: {
          host: 'smtp.gmail.com',
                   port: 465,
                   secure: true,
                   ignoreTLS: true,
                   auth: {
                       user: 'kafilwararafid1@gmail.com',
                       pass: 'Testingg1234'
                   },
                  }
      }),TypeOrmModule.forFeature([User])],
    controllers: [AdminController],
    providers: [AdminService],

})

export class AdminModule {}