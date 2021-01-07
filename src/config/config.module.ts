import { ConfigModule as Config } from '@nestjs/config';
import { Module } from '@nestjs/common';

@Module({
    imports: [Config.forRoot({ envFilePath: ['.env', '.env.development'] })],
})
export class ConfigModule {}
