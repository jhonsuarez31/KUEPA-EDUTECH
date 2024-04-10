import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString, IsUUID, MinLength } from "class-validator"

export class LoginDto {

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({type:'email', nullable:false, default:'test@gmail.com'})
    email: string
    
    
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @ApiProperty({type:'string', nullable:false, minLength:6, default:'test123'})
    password: string

}



export interface ILoginResponse {
    id:            string;
    email?:         string;
    token:         string;
}


