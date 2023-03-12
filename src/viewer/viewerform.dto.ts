import { IsAlphanumeric, IsEmail, IsNotEmpty, Length, MaxLength, MinLength, IsString, Matches, IsInt } from "class-validator"
import { Transform } from 'class-transformer'

export class ViewerForm {
    @MinLength(3, {
        message: 'Password must me more than 3 characters',
    })

    @MaxLength(8, {
        message: 'Password must be less than 8 characters'
    })

    @IsAlphanumeric()
    password: string    

    @IsEmail()
    email: string;

    @IsNotEmpty({
        message: "name cannot be empty"
    })
    @Transform(({ value }) => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase())
    name: string;

    isblocked: boolean;
    
}

export class ViewerLogin{
    @IsNotEmpty({ message: "Name should not be empty!" })
    @IsString({ message: "Name should not be character!" })
    @Length(4, 8, { message: "Input should be between 4 and 8 characters in length!" })
    name: string;

    @IsNotEmpty({ message: "Password should not be empty!" })
    @IsString({ message: "Password should not be character!" })
    @MinLength(6, { message: "Password should be minimum in 6 character!" })
    password: string;

    address: string;

    phoneNo: string;

    email: string;
    
    joiningYear: number;

    filename: string;
}


export class ViewerProfile {
    @IsNotEmpty({ message: "Name should not be empty!" })
    @IsString({ message: "Name should not be character!" })
    @Length(4, 8, { message: "Input should be between 4 and 8 characters in length!" })
    name: string;

    @IsNotEmpty({ message: "Password should not be empty!" })
    @IsString({ message: "Password should not be character!" })
    @MinLength(6, { message: "Password should be minimum in 6 character!" })
    password: string;

    @IsNotEmpty({ message: "Address should not be empty!" })
    @IsString({ message: "Address should not be character!" })
    address: string;

    @IsNotEmpty({ message: "Phone Number should not be empty!" })
    @Matches(/[0][1][3 4 5 6 7 8 9][0-9]{8}$/i, { message: "Phone Number Invalid!" })
    phoneNo: string;

    @IsNotEmpty({ message: "Email should not be empty!" })
    @IsEmail()
    email: string;

    @IsNotEmpty({ message: "Joining Year should not be empty!" })
    joiningYear: string;

    viewerImage: string;
}


export class ViewerVarifyPass{
    @IsNotEmpty()
    @IsInt()
    pin: number;

    @IsNotEmpty()
    password: string
}


export class ViewerCatagory {
    @IsNotEmpty({message: "Enter Your Name."})
    @IsString({message: "Name Should be String."})
    name: string;
}