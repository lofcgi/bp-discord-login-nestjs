import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { DiscordAuthGuard } from '../utils/guards/discord-auth.guard';
import { AuthenticatedGuard } from '../utils/guards/authenticated.guard';
import { AuthService } from '../services/auth.service';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @ApiOperation({ summary: 'Login' })
  @UseGuards(DiscordAuthGuard)
  @Get('discord')
  discordAuth() {
    console.log('discordAuth');
    // discord 인증 시작
  }

  @ApiOperation({ summary: 'redirect' })
  @UseGuards(DiscordAuthGuard)
  @Get('redirect')
  discordAuthCallback(@Res() res: Response) {
    // 인증 성공 후 리다이렉트
    res.redirect(this.configService.get('CLIENT_URL') as string);
  }

  @ApiOperation({ summary: 'status' })
  @UseGuards(AuthenticatedGuard)
  @Get('status')
  async status(@Req() req: Request) {
    return this.authService.status(req);
  }

  @ApiOperation({ summary: 'logout' })
  @Post('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    await this.authService.logout(req, res);
  }
}
