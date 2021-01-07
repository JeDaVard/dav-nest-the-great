import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @MinLength(3)
    @MaxLength(50)
    email: string;

    @IsString()
    @MinLength(2)
    @MaxLength(50)
    password: string;
}
