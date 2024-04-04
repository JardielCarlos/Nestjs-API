import { Injectable } from '@nestjs/common';
import * as bcrypt from "bcrypt";
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }
  
  findall() {
    return this.prisma.user.findMany()
  }

  async create(createUserDto: CreateUserDto) {
    const user = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10)
    };
    const createdUser = await this.prisma.user.create({
      data: user
    })

    return {
      ...createdUser,
      password: undefined
    };
  }

  remove(id: number) {
    return this.prisma.user.delete({ where: { id } })
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email }
    })
  }
}
