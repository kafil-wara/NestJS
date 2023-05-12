import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductionhouseEntity } from './productionhouseentity.entity';
import { ProductionhouseForm } from './productionhouseform.dto';
import { ProductionhouseFormUpdate } from './productionhouseformupdate.dto';
import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer/dist';
@Injectable()
export class ProductionhouseService {
  constructor(
    @InjectRepository(ProductionhouseEntity)
    private productionhouseRepo: Repository<ProductionhouseEntity>,
    private mailerService: MailerService,
  ) {}

  getIndex(): any {
    return this.productionhouseRepo.find();
  }
  getUserByID(id): any {
    return this.productionhouseRepo.findOneBy({ id });
  }

  getUserByIDName(qry): any {
    return this.productionhouseRepo.findOneBy({ id: qry.id, name: qry.name });
  }

  insertUser(mydto: ProductionhouseForm): any {
    const productionhouseaccount = new ProductionhouseEntity();
    productionhouseaccount.name = mydto.name;
    productionhouseaccount.email = mydto.email;
    productionhouseaccount.password = mydto.password;
    productionhouseaccount.address = mydto.address;
    return this.productionhouseRepo.save(productionhouseaccount);
  }

  updateUser(name, email): any {
    return this.productionhouseRepo.update({ email: email }, { name: name });
  }
  updateUserbyid(mydto: ProductionhouseFormUpdate, id): any {
    return this.productionhouseRepo.update(id, mydto);
  }
  deleteUserbyid(id): any {
    return this.productionhouseRepo.delete(id);
  }

  getVideosByProductionhouseID(id): any {
    return this.productionhouseRepo.find({
      where: { id: id },
      relations: {
        videos: true,
      },
    });
  }

  async signup(mydto) {
    const salt = await bcrypt.genSalt();
    const hassedpassed = await bcrypt.hash(mydto.password, salt);
    mydto.password = hassedpassed;
    return this.productionhouseRepo.save(mydto);
  }

  async signin(mydto) {
    console.log(mydto.password);
    const mydata = await this.productionhouseRepo.findOneBy({
      email: mydto.email,
    });
    console.log('mydata:', mydata);
    const isMatch = await bcrypt.compare(mydto.password, mydata.password);
    if (isMatch) {
      return 1;
    } else {
      return 0;
    }
  }

  async sendEmail(mydata) {
    return await this.mailerService.sendMail({
      to: mydata.email,
      subject: mydata.subject,
      text: mydata.text,
    });
  }
}
