import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
export async function  encryptPassword(passwordUser: string) : Promise<string> {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(passwordUser, saltOrRounds);
    return  hash
}

export async function compareHash(passwordUser:string, passwordHash:string): Promise<Boolean> {
    const isMatch = await bcrypt.compare(passwordUser, passwordHash);
    if(!isMatch)  throw new UnauthorizedException('PASSWORD_BAD')
    return isMatch
}