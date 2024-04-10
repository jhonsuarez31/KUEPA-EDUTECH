import { BadRequestException, Body, Controller, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { LoginDto } from 'src/dto/auth/login.dto';
import { CreateUserDto } from 'src/dto/user/user.dto';
import { AuthService } from 'src/services/auth/auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) { }

  @Post('register-student')
  registerStudent(@Body() createuserDto: CreateUserDto) {
    createuserDto.rol_name = 'ESTUDIANTE'
    return this.authService.singIn(createuserDto)
  }

  @Post('register-moderator')
  registerModerator(@Body() createuserDto: CreateUserDto) {
    createuserDto.rol_name = 'MODERADOR'
    return this.authService.singIn(createuserDto)
  }
 

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    console.log('log', loginDto)
    return this.authService.login(loginDto)
  }

  /*

  @ApiBody({ type: ForgotPasswordDto })
  @Post('/forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto.email)
  }


  @Patch('/reset-password/:token')
  async resetPassword(@Param('token') token: string, @Body() resetPasswordDto: ResetPasswordDto) {
    const decodedToken = await this.authService.verifyResetToken(token);
    if (!decodedToken) {
      throw new BadRequestException('TOKEN_INVALID');
    }
    return await this.authService.resetPassword(decodedToken.id, resetPasswordDto);
    
  }


  @Post('/verificatToken/:token/email/:email')
  async verificatToken(@Param('token') token:string, @Param('email') email:string) {
    return this.authService.verificatToken(token, email)
  }*/
}
