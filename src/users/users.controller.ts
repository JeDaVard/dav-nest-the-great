import {
    Controller,
    Get,
    Post,
    Body,
    Put,
    Param,
    Delete,
    ValidationPipe,
    Res,
    UseGuards,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetCurrentUser } from './decorators/get-user.decorator';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Post('/sign-up')
    async signUp(@Body(ValidationPipe) authCredentialsDto: CreateUserDto) {
        return this.usersService.signUp(authCredentialsDto);
    }

    @Post('/sign-in')
    async signIn(
        @Res({ passthrough: true }) res: FastifyReply,
        @Body(ValidationPipe) authCredentialsDto: CreateUserDto,
    ) {
        const user = await this.usersService.signIn(authCredentialsDto);
        // const { accessToken } = user;
        // delete user.accessToken;
        // res.setCookie('access_token', accessToken, {});
        return user;
    }

    @Get('me')
    @UseGuards(AuthGuard())
    async test(@GetCurrentUser() user: User) {
        return user;
    }

    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(+id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(+id, updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.remove(+id);
    }
}
