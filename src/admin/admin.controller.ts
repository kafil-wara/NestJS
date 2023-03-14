import { Body, Controller, Delete, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, ParseIntPipe, Post, Put, Query, Session, UnauthorizedException, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe} from "@nestjs/common";
import { Req } from "@nestjs/common";
import { AdminForm } from "./adminform.dto";
import { AdminService } from "./adminservice.service";
import * as session from 'express-session'
import { request } from "http";
import { SessionGuard } from "./admin.session.guard";
import { diskStorage } from "multer";
import { FileInterceptor } from "@nestjs/platform-express";



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


    // @Get('/findusersbyadmin/:id')
    // async getUsersByAdminID(@Param('id', ParseIntPipe) id: number): Promise<any> {
    //     return await this.adminService.getUsersByAdminID(id);
    // }


    @Get('/findusersbyadmin/:id')
    getUsersByAdminID(@Param('id', ParseIntPipe) id: number): any {
      return this.adminService.getUsersByAdminID(id);
    }

    @Post('/sendemail')
    @UseGuards(SessionGuard)
    sendEmail(@Body() mydata) {
        return this.adminService.sendEmail(mydata)
    }

    @Post('/signup')
    @UseInterceptors(FileInterceptor('myfile', {
        storage:diskStorage({
            destination:'./uploads',
            filename: function (req, file, cb) {
                cb(null,Date.now()+file.originalname)
            }
        })
    }))
    signup(@Body() mydto:AdminForm, @UploadedFile(new ParseFilePipe({
        validators: [
            new MaxFileSizeValidator({ maxSize: 160000 }),
            new FileTypeValidator({ fileType: 'png|jpg|jpeg'}),
        ],
    }),) file: Express.Multer.File) {
        console.log(file)
        return this.adminService.signup(mydto);
        
    }

    @Get('/signin')
    async signin(@Session() session, @Body() mydto:AdminForm) {
        if (await this.adminService.signin(mydto)) {
            session.email = mydto.email;
            session.name = mydto.name;
            console.log("Email: " + session.email);
            return {message: "Logged in!"};
        }
        else {
            return {message: "Invalid Credentials"};
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