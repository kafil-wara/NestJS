import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from 'typeorm'
import { User } from "./adminentity.entity"
import { Transform } from "class-transformer"
import { AdminForm } from "./adminform.dto";
import { MailerService } from "@nestjs-modules/mailer";
import * as bcrypt from 'bcrypt';
import { ILike } from "typeorm";



@Injectable()
export class AdminService {

    
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private mailerService: MailerService
    ){} 

    getIndex():string { 
        return "Admin Index"; 

    }

    getAllUsers():any {
        return this.usersRepository.find()
    }

    getUserByID(id):any {   
        return this.usersRepository.findOneBy({ id })
        //return "the id is "+id;
    }

    //getUserByName(qry):any {
        
        //return this.usersRepository.findOneBy(qry.name)
    //}

    async searchByName(name: string): Promise<User[]> {
        return this.usersRepository.find({
          where: {
            name: ILike("%" + name + "%"), // case-insensitive search
              
          },
        });
      }

    //create a function that gets the user by provided id, takes in the new data and updates the user
    updateUser(id, mydto: AdminForm):any {
        return this.usersRepository.update(id, mydto)
        //return "the id "+ id + " is updated";
    }


    blockUser(id: any): any {
        this.usersRepository.findOne({ where: { id } })
          .then(user => {
            if (user) {
              const isBlocked = !user.isblocked;
              console.log("The id " + id + " is " + (isBlocked ? "blocked" : "unblocked"));
              return this.usersRepository.update(id, { isblocked: isBlocked });
            }
            return null;
          })
          .catch(error => {
            console.log(error);
            return null;
          });
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
        mydto.isblocked = false;
        return this.usersRepository.save(mydto);
    }

    async signin(mydto){
        let authenticated = false;
        //console.log("Password: " + mydto.password);
        const mydata= await this.usersRepository.findOneBy({email: mydto.email});
        if(mydata) {
            const match = await bcrypt.compare(mydto.password, mydata.password);
            if(match) {
                console.log("Success")
                authenticated = true;
                return authenticated;
            }
            else {
                console.log("Invalid Creds")
                return authenticated;
            }
        }
        else {
            console.log("User not found");
            return 0;
        }        
    }
    

}