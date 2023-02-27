import { IsAlphanumeric, IsEmail, IsNotEmpty, Length, MaxLength, MinLength } from "class-validator"

export class AdminForm {
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
    name: string;
    
}