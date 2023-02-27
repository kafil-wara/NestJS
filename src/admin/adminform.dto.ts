import { IsEmail, IsNotEmpty, Length } from "class-validator"

export class AdminForm {
    @Length(3,8)
    password: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    name: string;
}