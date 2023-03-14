import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from 'typeorm'
import { User } from "./adminentity.entity"
import { Transform } from "class-transformer"
import { AdminForm } from "./adminform.dto";
import { MailerService } from "@nestjs-modules/mailer";
import * as bcrypt from 'bcrypt';
import { Session } from "@nestjs/common";
import { getManager } from "typeorm";
import 'reflect-metadata'



@Injectable()
export class AdminService {

    
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private mailerService: MailerService
    ){} 

    getIndex():string { 
        return "Welcome Admin"; 

    }

    getAllUsers():any {
        return this.usersRepository.find()
    }

    getUserByID(id):any {   
        return this.usersRepository.findOneBy({ id })
        //return "the id is "+id;
    }

    blockUser(id):any {
        return this.usersRepository.update(id, {isblocked: true})
        //return "the id "+ id + " is blocked";
    }

    addNewUser(mydto: AdminForm):any {
        const useracc = new User()
        useracc.name = mydto.name;
        useracc.email = mydto.email;
        useracc.password = mydto.password;
        useracc.isblocked = false;
        return this.usersRepository.save(useracc);
        //return "User with id " + mydto.id + ", name " + mydto.name + " & email " + mydto.email + " added"
    }

    deleteUser(qry):any {
        //const toDelete = this.usersRepository.findOneBy(qry.id)
        return this.usersRepository.delete(qry.id);
        //return "User with id " +qry.id + " deleted"
    }

    setPrice(price):any {
        return "New monthly subscription price is " + price + "BDT"
    }

    checkManagerRequests(): any {
        return "Manager requests(Production House Aprroval)"
    }

    removeShow(qry): any {
        return "Show " + qry.id + " Removed!"
    }

    payProductionHouse(id, amount): any {
        return amount + "BDT paid to " + id;
    }

    async getUsersByAdminID(adminId: number): Promise<User[]> {
        const users = await this.usersRepository.createQueryBuilder('user')
          .where('user.adminId = :adminId', { adminId })
          .leftJoinAndSelect('user.admin', 'admin')
          .getMany();
      
        return users;
      }
    

    async sendEmail(mydata){
        return await this.mailerService.sendMail({
            to: mydata.email,
            subject: mydata.subject,
            text: mydata.text,
        });
    }

    async signup(mydto) {
        const salt = await bcrypt.genSalt();
        const hashedPass = await bcrypt.hash(mydto.password, salt);
        mydto.password = hashedPass;
        return this.usersRepository.save(mydto);
    }

    async signin(mydto){
        console.log("Password: " + mydto.password);
        const mydata= await this.usersRepository.findOneBy({email: mydto.email});
        if(mydata) {
            const match = await bcrypt.compare(mydto.password, mydata.password);
            if(match) {
                console.log("Success")
                return true;
            }
            else {
                console.log("Invalid Creds")
                return false;
            }
        }
        else {
            console.log("User not found");
            return 0;
        }
        // console.log(mydata.password);
        // const isMatch= await bcrypt.compare(mydto.password, mydata.password);
        // if(isMatch) {
        //     return 1;
        // }
        // else {
        //     return 0;
        // }
        
    }

    // async signin(mydto) {
    //     console.log(mydto.password);
    //     const salt = await bcrypt.genSalt();
    //     const mydata = await this.usersRepository.findOneBy({email: mydto.email});
    //     const hash = await bcrypt.hash(mydto.password, salt)
    //     const isMatch = await bcrypt.compare(hash, mydata.password);
    //     if(isMatch) {
    //         return 1;
    //     }
    //     else {
    //         return 0;
    //     }
    // }

}