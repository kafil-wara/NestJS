import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Session, UsePipes, ValidationPipe} from "@nestjs/common";
import { AdminForm } from "./adminform.dto";
import { AdminService } from "./adminservice.service";


@Controller("/admin")
export class AdminController
{ 
    constructor(private adminService: AdminService){}

    @Get("/index/")
    getAdmin(): any { 
        return this.adminService.getIndex();
    }

    @Get("/alluser")
    getAllUser(): any {
        return this.adminService.getAllUsers();
    }

    @Get("/finduser/:id")
    getUserByID(@Param('id', ParseIntPipe) id:number,): any {
      return this.adminService.getUserByID(id);
    }

    @Post("/setprice/")
    setPrice(
        @Body("price") price:number,
    ):any {
        return this.adminService.setPrice(price);
    }
 
    @Delete("/deleteuser/")
    deleteUser(@Query() qry:any): any {
        return this.adminService.deleteUser(qry);
    }

    @Put("/blockuser/")
    blockUser(
        @Body("id") id:number
    ): any {
        return this.adminService.blockUser(id);
    }

    @Post("/adduser/")
    @UsePipes(new ValidationPipe)
    addNewUser(@Body() mydto:AdminForm):any {
                
        return this.adminService.addNewUser(mydto);
    }

    @Delete("/removeshow/")
    removeShow(@Query() qry:any): any {
        return this.adminService.removeShow(qry);
    }

    @Get("/managerrequests")
    checkManagerRequests(): any { 
        return this.adminService.checkManagerRequests();
    }

    @Post("/payprodhouse/")
    payProductionHouse(
        @Body("id") id:number,
        @Body("amount") amount:number
    ):any {
        return this.adminService.payProductionHouse(id, amount);
    }

    @Post('/sendemail')
    sendEmail(@Body() mydata) {
        return this.adminService.sendEmail(mydata)
    }

    
}