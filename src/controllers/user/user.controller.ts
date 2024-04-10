import { Controller, Delete, Get, Param, ParseUUIDPipe, Put, Req, UseGuards, Body } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from 'src/dto/user/user.dto';
import { UserService } from 'src/services/user/user.service';

@ApiTags('USER')
@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ){}
    
    @Get()
    healthCheck():string{
        return 'ok'
    }

   // @ApiBearerAuth()
    @ApiOkResponse({
        description: 'The Users was successfully found.',
    })
    @Get('list')
    findAll(@Req() req,  ){
        return this.userService.findAll()
    }

    @Get('/:idUser')
    getOne(@Param('idUser', ParseUUIDPipe) idUser: string){
        return this.userService.getOne(idUser)
    }
    
  //  @ApiBearerAuth()
    @Put('changue-status-isActive/:idUser')
    changueStatus(@Param('idUser', ParseUUIDPipe) idUser: string){
        return this.userService.changueStateActive(idUser)
    }

    /*

    @ApiBearerAuth()
    @Delete('delete/:idUser')
    deleteOne(@Param('idUser', ParseUUIDPipe) idUser: string){
        return this.userService.delete(idUser)
    }   

     
    @ApiBearerAuth()
    @Put('update/:idUser')
    updateOne(@Param('idUser', ParseUUIDPipe) idUser: string, @Body() updateUserDto:UpdateUserDto ){
        return this.userService.update(idUser, updateUserDto)
    }
    */

}
