import { ConfigModule as Config } from '@nestjs/config';
import { Module } from '@nestjs/common';

@Module({
    imports: [Config.forRoot({ envFilePath: ['.env.development', '.env'] })],
})
export class ConfigModule {}
