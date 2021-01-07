import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersRepository)
        private userRepository: UsersRepository,
        private jwtService: JwtService,
    ) {}

    async signUp(CreateUserDto: CreateUserDto) {
        const user = await this.userRepository.createUser(CreateUserDto);
        const payload = { id: user.id, username: user.email };
        const accessToken = this.jwtService.sign(payload, { secret: process.env.JWT_SECRET });
        return { ...user, accessToken };
    }

    async signIn(authCredentialsDto: CreateUserDto) {
        const user = await this.userRepository.signIn(authCredentialsDto);
        const payload = { id: user.id, username: user.email };
        const accessToken = this.jwtService.sign(payload, { secret: process.env.JWT_SECRET });
        return { ...user, accessToken };
    }

    create(createUserDto: CreateUserDto) {
        return 'This action adds a new user';
    }

    async findAll() {
        return this.userRepository.find({ take: 100 });
    }

    findOne(id: number) {
        return `This action returns a #${id} user`;
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}
