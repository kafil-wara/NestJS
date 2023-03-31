import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Patch, UseGuards, Query, FileTypeValidator, MaxFileSizeValidator, UploadedFile, ParseFilePipe, UseInterceptors, Session, UnauthorizedException, UsePipes, ValidationPipe} from "@nestjs/common";
import { Req } from "@nestjs/common";
import { ViewerForm } from "./viewerform.dto";
import { ViewerService } from "./viewerservice.service";
import * as session from 'express-session'
import { request } from "http";
import { ViewerSessionGuard } from "./session.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { Express } from "express";
import { Multer } from 'multer';

import { ViewerCatagory, ViewerLogin, ViewerProfile, ViewerVarifyPass } from "./viewerform.dto";



@Controller("/viewer")
export class ViewerController
{ 
    constructor(private viewerService: ViewerService){}

    @Post('/addViewer')
    @UsePipes(new ValidationPipe())
    @UseInterceptors(FileInterceptor('viewerImage', {
        storage: diskStorage({
            destination: './files',
            filename: function (req, file, cb) {
                cb(null,Date.now() + "_" +file.originalname)
            }
        })
    }))
    addViewer(
        @UploadedFile(new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({ maxSize: 2097152 }),
                    new FileTypeValidator({ fileType: /(png|jpg|jpeg)$/ }),
                ]
            }
        )) viewerImage: Express.Multer.File,
        @Body() viewer: ViewerProfile
        ): any {
        console.log(viewerImage);
        viewer.viewerImage = viewerImage.filename;
        return this.viewerService.addViewer(viewer);
    }

    // login to dashboard
    @Post("/login")
    @UsePipes(new ValidationPipe())
    async loginViewer(
        @Session() session,
        @Body() viewer: ViewerLogin
    ) {
        // return this.viewerservice.loginViewer(viewer);
        if(await this.viewerService.loginViewer(viewer)) {
            session.name = viewer.name;
            session.phoneNo = viewer.phoneNo;
            session.email = viewer.email;
            session.address = viewer.address;
            session.joiningYear = viewer.joiningYear;
            return {message: "Login Succesful!"};
        }
        else {
            return {message: "Username or Password Invalid!"};
        }
    }

    // pin sent to email with smtp service
    @Post("/forgetPassword/")
    @UsePipes(new ValidationPipe())
    forgetPassword(@Body() acc: any): any {
        return this.viewerService.forgetPassword(acc);
    }

    // varify the varification pin and reset password (forgetpassword)
    @Patch("/varifyPass")
    varifyPass(@Body() viewer: ViewerVarifyPass): any {
        return this.viewerService.varifyPass(viewer);
    }



// ------------------- Viewer Related Routes [Start] ---------------------//


    @Get('/logout')
    @UseGuards(ViewerSessionGuard)
    logout(@Session() session) {
        if(session.destroy())
            return {message: "Logged out successful"};
        
        else
            throw new UnauthorizedException("invalid actions");
    }

    @Get("/index/")
    getViewer(): any { 
        return this.viewerService.getIndex();
    }

    @Get("/allviewer")
    getAllUser(): any {
        return this.viewerService.getAllviewer();
    }

    @Get("/findcategories/:id")
    findcategories(@Param('id', ParseIntPipe) id:number,): any {
      return this.viewerService.findcategories(id);
    }

    @Post("/subprice/")
    subPrice(
        @Body("price") price:number,
    ):any {
        return this.viewerService.subPrice(price);
    }
 
    @Delete("/deletecomment/")
    deleteUser(@Query() qry:any): any {
        return this.viewerService.deletecomment(qry);
    }

    @Put("/blockvideo/")
    blockvideo(
        @Body("id") id:number
    ): any {
        return this.viewerService.blockvideo(id);
    }

    @Post("/addReferral/")
    @UsePipes(new ValidationPipe)
    addReferral(@Body() mydto:ViewerForm):any {
                
        return this.viewerService.addReferral(mydto);
    }

    @Get("/notification/:id")
    notification(@Param('id', ParseIntPipe) id:number,): any {
      return this.viewerService.notification(id);
    }


    @Post('/sendemail')
    sendEmail(@Body() mydata) {
        return this.viewerService.sendEmail(mydata)
    }
    

}