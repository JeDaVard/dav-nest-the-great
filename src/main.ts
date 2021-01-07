import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import fastifyCookie from 'fastify-cookie';

import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter({ logger: false }),
    );
    await app.register(fastifyCookie, {
        secret: process.env.COOKIE_SIGNATURE_SECRET, // for cookies signature
    });
    await app.listen(process.env.PORT, () => {
        console.log(`Server is up on ${process.env.PORT} ..`);
    });
}

bootstrap();
