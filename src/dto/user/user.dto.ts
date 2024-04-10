import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID, Matches, MinLength, isBoolean } from "class-validator";

export class CreateUserDto {
    @ApiProperty({example:'test123'})
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @ApiProperty({example:'test@gmail.com'})
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({example:'Jhon Doe'})
    @IsString()
    @IsNotEmpty()
    firstName: string;
    
    @ApiProperty({example:'Doe'})
    @IsString()
    @IsNotEmpty()
    lastName: string;


    
//    @ApiProperty({example:'b8ef7599-0edb-4123-9f36-b2f8346e66c7'})
    @IsOptional()
    @IsString()
    rol_name: string;

    @IsString()
    @IsOptional()
    resetPasswordToken?:string

    @IsOptional()
    @IsBoolean()
    is_active: boolean


    @IsOptional()
    @IsString()
    activationToken:string

    @IsOptional()
    @IsString()
    tokenDate: Date

}



export class UpdateUserDto extends PartialType(CreateUserDto) {}
