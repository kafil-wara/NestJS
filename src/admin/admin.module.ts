import { Module } from "@nestjs/common";
import { AdminController } from "./admin.controller"
import { AdminService } from "./adminservice.service"
import { TypeOrmModule } from "@nestjs/typeorm"
import { User } from "./adminentity.entity"

@Module({

    imports: [TypeOrmModule.forFeature([User])],
    controllers: [AdminController],
    providers: [AdminService],

})

export class AdminModule {}