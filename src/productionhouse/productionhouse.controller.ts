import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
  Session,
  UseGuards,
} from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { VideoForm } from 'src/video/video.dto';
import { VideoService } from 'src/video/video.service';
import { ProductionhouseForm } from './productionhouseform.dto';
import { ProductionhouseFormUpdate } from './productionhouseformupdate.dto';
import { ProductionhouseService } from './productionhouseservice.service';
import { SessionGuard } from './session.guard';

@Controller('/productionhouse')
export class ProductionhouseController {
  constructor(
    private productionhouseService: ProductionhouseService,
    private videoService: VideoService,
  ) {}

  @Get('/index')
  getProductionhouse(): any {
    return this.productionhouseService.getIndex();
  }

  @Get('/findproductionhouse/:id')
  getProductionhouseByID(@Param('id', ParseIntPipe) id: number): any {
    return this.productionhouseService.getUserByID(id);
  }

  @Get('/findproductionhouse')
  getProductionhouseByIDName(@Query() qry: any): any {
    return this.productionhouseService.getUserByIDName(qry);
  }
  @Post('/insertproductionhouse')
  @UsePipes(new ValidationPipe())
  insertProductionhouse(@Body() mydto: ProductionhouseForm): any {
    return this.productionhouseService.insertUser(mydto);
  }

  @Put('/updateproductionhouse/')
  @UseGuards(SessionGuard)
  @UsePipes(new ValidationPipe())
  updateProductionhouse(@Session() session, @Body('name') name: string): any {
    console.log(session.email);
    return this.productionhouseService.updateUser(name, session.email);
  }

  @Put('/updateproductionhouse/:id')
  @UsePipes(new ValidationPipe())
  updateProductionhousebyid(
    @Body() mydto: ProductionhouseFormUpdate,
    @Param('id', ParseIntPipe) id: number,
  ): any {
    return this.productionhouseService.updateUserbyid(mydto, id);
  }

  @Delete('/deleteproductionhouse/:id')
  deleteProductionhousebyid(@Param('id', ParseIntPipe) id: number): any {
    return this.productionhouseService.deleteUserbyid(id);
  }

  @Post('/insertvideo')
  @UsePipes(new ValidationPipe())
  insertVideo(@Body() videodto: VideoForm): any {
    return this.videoService.insertVideo(videodto);
  }

  @Get('/findvideosbyproductionhouse/:id')
  getVideoByProductionhouseID(@Param('id', ParseIntPipe) id: number): any {
    return this.productionhouseService.getVideosByProductionhouseID(id);
  }

  @Get('/findproductionhousebyvideo/:id')
  getProductionhouseByVideoID(@Param('id', ParseIntPipe) id: number): any {
    return this.videoService.getProductionhouseByVideoID(id);
  }

  @Post('/signup')
  @UseInterceptors(
    FileInterceptor('myfile', {
      storage: diskStorage({
        destination: './uploads',
        filename: function (req, file, cb) {
          cb(null, Date.now() + file.originalname);
        },
      }),
    }),
  )
  signup(
    @Body() mydto: ProductionhouseForm,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 16000 }),
          new FileTypeValidator({ fileType: 'png|jpg|jpeg|' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    mydto.filename = file.filename;

    return this.productionhouseService.signup(mydto);
    console.log(file);
  }
  // @Get('/signin')
  // signin(@Session() session, @Body() mydto: ProductionhouseForm) {
  //   if (this.productionhouseService.signin(mydto)) {
  //     session.email = mydto.email;

  //     console.log(session.email);
  //     return { message: 'success' };
  //   } else {
  //     return { message: 'invalid credentials' };
  //   }
  // }
  @Post('/signin')
  async signin(@Session() session, @Body() mydto: ProductionhouseForm) {
    if (await this.productionhouseService.signin(mydto)) {
      session.email = mydto.email;

      console.log(session.email);
      return { message: 'success' };
    } else {
      return { message: 'invalid credentials' };
    }
  }

  @Get('/signout')
  signout(@Session() session) {
    if (session.destroy()) {
      return { message: 'you are logged out' };
    } else {
      throw new UnauthorizedException('invalid actions');
    }
  }
  @Post('/sendemail')
  sendEmail(@Body() mydata) {
    return this.productionhouseService.sendEmail(mydata);
  }
}
