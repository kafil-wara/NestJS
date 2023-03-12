import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from 'typeorm'
import { Transform } from "class-transformer"
import { ViewerForm } from "./viewerform.dto";
import { User } from "./viewerentity.entity"
import { MailerService } from "@nestjs-modules/mailer";
import * as bcrypt from 'bcrypt';
import { ViewerCatagory, ViewerLogin, ViewerProfile, ViewerVarifyPass } from "./viewerform.dto";


@Injectable()
export class ViewerService {

    
    constructor(
        @InjectRepository(User) private adminRepo: Repository<User>,
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private mailerService: MailerService
    ){} 

    getIndex():string { 
        return "Viewer Index"; 

    }

    getAllviewer():any {
        return this.usersRepository.find()
    }

    findcategories(id):any {   
        return this.usersRepository.find()
    }

    subPrice(price):any {
        return "Your monthly subscription price is " + price + "BDT"
    }
    
    deletecomment(qry):any {
        return this.usersRepository.delete(qry.id);
    }

    blockvideo(id):any {
        return this.usersRepository.update(id, {isblocked: true})
        //return "the id "+ id + " is blocked";
    }

    addReferral(mydto: ViewerForm):any {
        const useracc = new User()
        useracc.name = mydto.name;
        useracc.email = mydto.email;
        useracc.password = mydto.password;
        useracc.isblocked = false;
        return this.usersRepository.save(useracc);
        //return "User with id " + mydto.id + ", name " + mydto.name + " & email " + mydto.email + " added"
    }

    notification(id):any {   
        return this.usersRepository.find()
        //return "the id is "+id;
    }

    async sendEmail(mydata){
        return await this.mailerService.sendMail({
            to: mydata.email,
            subject: mydata.subject,
            text: mydata.text,
        });
    }

    private pin: number;
    private id: any;



    async addViewer(viewer: ViewerProfile) {
        const vieweraccount = new User();
        vieweraccount.name = viewer.name;
        vieweraccount.phoneNo = viewer.phoneNo;
        vieweraccount.email = viewer.email;
        vieweraccount.address = viewer.address;
        vieweraccount.joiningYear = viewer.joiningYear;
        vieweraccount.viewerImage = viewer.viewerImage;
        
        const salt = await bcrypt.genSalt();
        vieweraccount.password = await bcrypt.hash(viewer.password, salt);

        const isValidName = await this.usersRepository.findOneBy({ name: viewer.name });
        const isValidEmail = await this.usersRepository.findOneBy({ email: viewer.email });

        if(!isValidName && !isValidEmail) {
            await this.usersRepository.save(vieweraccount);
            return "Viewer successfully added";
        }
        else
            return "Username or Email already been registered!";
    }


    async loginViewer(viewer: ViewerLogin) {
        const user = await this.usersRepository.findOneBy({
            name: viewer.name
        });

        try {
            if(viewer.password == user.password)
                return 1;
            
            else {
                const isValid = await bcrypt.compare(viewer.password, user.password);

                if(isValid) 
                    return 1;
                
                else if(!isValid)
                    return 0;
            }
        }
        catch{
            return 0;
        }
    }


    async forgetPassword(acc: any) {
        let user = await this.usersRepository.findOneBy({
            email: acc.email
        });

        try {
            this.id = user.id;
            console.log(`ID is ${this.id}`);

            this.pin = Math.floor(100000 + Math.random() * 900000);
            await this.mailerService.sendMail({
                from: "blazeaxelspy@gamil.com",
                to: acc.email,
                subject: `Reset password Instruction from GraspWay`,
                text: `Let's reset your password\nG-${this.pin} is you varification code\n\n*Don't share with anyone.`,
            });
            console.log(this.pin);

            return "Varification Code sent to Viewer Email."
        }
        catch {
            return "Email not found!";
        }
    }


    async varifyPass(viewer: ViewerVarifyPass) {
        let isValid = false;
        if(viewer.pin == this.pin)
            isValid = true;

        if(isValid) {
            const salt = await bcrypt.genSalt();
            viewer.password = await bcrypt.hash(viewer.password, salt);
            this.usersRepository.update(this.id, {password: viewer.password} );
            this.pin = null;
            return "Password reseted!";
        }

        else
            return "Invalid or expired pin.";
    }

}