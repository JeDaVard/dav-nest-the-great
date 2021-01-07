import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { UsersModule } from './users/users.module';

@Module({
    imports: [
        ConfigModule.forRoot({ envFilePath: ['.env', '.env.development'] }),
        TypeOrmModule.forRoot(typeOrmConfig),
        ConfigModule,
        UsersModule,
    ],
})
export class AppModule {}
