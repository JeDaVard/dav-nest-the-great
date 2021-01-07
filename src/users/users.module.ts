import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({ secret: process.env.JWT_SECRET, signOptions: { expiresIn: 3600 } }),
        TypeOrmModule.forFeature([UsersRepository]),
    ],
    controllers: [UsersController],
    providers: [UsersService, JwtStrategy],
    exports: [JwtStrategy, PassportModule],
})
export class UsersModule {}
