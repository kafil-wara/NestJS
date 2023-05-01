import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Session, UnauthorizedException, UsePipes, ValidationPipe} from "@nestjs/common";
import { Req } from "@nestjs/common";
import { AdminForm } from "./adminform.dto";
import { AdminService } from "./adminservice.service";
import { User } from "./adminentity.entity";
//import * as session from 'express-session'
//import { request } from "http";



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

    @Get("/finduserbyname/")
    async searchByName(@Query('name') name: string): Promise<User[]> {
        return this.adminService.searchByName(name);
      }
    // getUserByName(@Query() name): any {
    //     return this.adminService.getUserByName(name);
    // }

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

    @Put("/updateuser/")
    updateUser(
        @Body("id") id:number,
        @Body() mydto: AdminForm
    ):any {
        return this.adminService.updateUser(id, mydto);
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

    @Post('/signup')
    signup(@Body() mydto:AdminForm):any {
        return this.adminService.signup(mydto);
    }

    @Post('/signin')
    async signin(@Session() session, @Body() mydto:AdminForm) {
        if (await this.adminService.signin(mydto)) {
            //session.email = mydto.email;
            //console.log("Email: " + session.email);
            return {authenticated: true};
        }
        else {
            return {authenticated: false};
        }
    }

    @Get('/signout')
    signout(@Session() session)
    {
        if(session.destroy()) {
            return {message: "Logged out successfully"};
        }
        else {
            throw new UnauthorizedException("Invalid Action!");
        }
    }

    
    

}