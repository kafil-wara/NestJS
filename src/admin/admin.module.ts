import { Module } from "@nestjs/common";
import { AdminController } from "./admin.controller"
import { AdminService } from "./adminservice.service"
import { TypeOrmModule } from "@nestjs/typeorm"
import { User } from "./adminentity.entity"
import { MailerModule } from '@nestjs-modules/mailer';

@Module({

    imports: [MailerModule.forRoot({
        transport: {
          host: 'smtp.office365.com',
                   port: 587,
                   secure: false,
                   auth: {
                       user: 'bdflix.adm@hotmail.com',
                       pass: 'BdflixAdmin'
                   },
                   tls: {
                        ciphers: 'SSLv3'
                   }
                  }
      }),TypeOrmModule.forFeature([User])],
    controllers: [AdminController],
    providers: [AdminService],

})

export class AdminModule {}