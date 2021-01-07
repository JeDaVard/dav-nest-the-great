import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersRepository)
        private userRepository: UsersRepository,
        private jwtService: JwtService,
    ) {}

    async signUp(authCredentialsDto: CreateUserDto) {
        const user = await this.userRepository.createUser(authCredentialsDto);
        const payload = { id: user.id, username: user.email };
        const accessToken = this.jwtService.sign(payload);
        return { ...user, accessToken };
    }

    async signIn(authCredentialsDto: CreateUserDto) {
        const user = await this.userRepository.signIn(authCredentialsDto);
        const payload = { id: user.id, username: user.email };
        const accessToken = this.jwtService.sign(payload);
        return { ...user, accessToken };
    }

    create(createUserDto: CreateUserDto) {
        return 'This action adds a new user';
    }

    findAll() {
        return this.userRepository.find({ select: ['id', 'email'] });
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
