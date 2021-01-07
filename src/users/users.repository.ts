import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import {
    BadRequestException,
    ConflictException,
    InternalServerErrorException,
    Logger,
} from '@nestjs/common';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
    private logger = new Logger('UserController');
    private static async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }
    async createUser(authCredentialsDto: CreateUserDto): Promise<User> {
        const { email, password } = authCredentialsDto;

        const user = new User();
        user.email = email;
        await user.hashPassword(password);

        try {
            await user.save();
        } catch (e) {
            if (e.code === '23505') {
                this.logger.error(`Username ${email} is already taken`);
                throw new ConflictException('Username taken');
            } else {
                this.logger.error('[ERROR]', e);
            }
            throw new InternalServerErrorException();
        }

        delete user.password;
        delete user.salt;

        return user;
    }
    async signIn(authCredentialsDto: CreateUserDto): Promise<User> {
        const { email, password } = authCredentialsDto;

        const user = await this.findOne({ email });
        if (user && (await user.validatePassword(password))) {
            delete user.password;
            delete user.salt;

            return user;
        }

        throw new BadRequestException('Invalid credentials');
    }
}
