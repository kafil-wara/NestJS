import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from 'typeorm'
import { User } from "./adminentity.entity"
import { Transform } from "class-transformer"



@Injectable()
export class AdminService {

    
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ){} 

    getIndex():string { 
        return "Admin Index"; 

    }
    getUserByID(id):any {   
        return "the id is "+id;
    }

    blockUser(id):any {
        return "the id "+ id + " is blocked";
    }

    addNewUser(mydto):any {
        const adminacc = new User()
        adminacc.name = mydto.name;
        adminacc.email = mydto.email;
        adminacc.password = mydto.password;
        return this.usersRepository.save(adminacc);
        //return "User with id " + mydto.id + ", name " + mydto.name + " & email " + mydto.email + " added"
    }

    deleteUser(qry):any {
        return "User with id " +qry.id + " deleted"
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

}