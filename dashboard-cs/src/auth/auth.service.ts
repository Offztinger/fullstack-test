import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) { }

  async register(name: string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.prisma.users.create({
      data: { name, email, password: hashedPassword },
    });

    return { id: user.id, name: user.name, email: user.email };
  }

  async login(email: string, password: string, req: Request) {
    const user = await this.prisma.users.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    await this.prisma.users_login.create({
      data: {
        user_id: user.id,
        ip: req.ip,
        user_agent: req.headers['user-agent'],
      },
    });

    const payload = { sub: user.id, email: user.email };
    const token = this.jwt.sign(payload);

    return {
      access_token: token,
      user: {
        id: user.id,
        email: user.email,
      },
    };
  }

}
