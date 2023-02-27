import { Injectable } from "@nestjs/common";


@Injectable()
export class AdminService {

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
        return "User with id " + mydto.id + " ,name " + mydto.name + "& email " + mydto.email + " added"
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