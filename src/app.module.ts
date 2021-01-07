import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { UsersModule } from './users/users.module';

console.log(process.env.POSTGRES_HOST, process.env.PORT);
@Module({
    imports: [ConfigModule, TypeOrmModule.forRoot(typeOrmConfig), UsersModule],
})
export class AppModule {}
