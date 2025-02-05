import { IsString, IsEmail, IsOptional, IsNumber, Min } from "class-validator";

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    username?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    password?: string;

    @IsOptional()
    @IsString()
    firstName?: string;

    @IsOptional()
    @IsString()
    lastName?: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    age?: number;

    @IsOptional()
    @IsString()
    avatar?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    favoriteArtists?: string[];

    @IsOptional()
    attendedConcerts?: string[];

    @IsOptional()
    friends?: string[];

    @IsOptional()
    settings?: Record<string, any>;
}
