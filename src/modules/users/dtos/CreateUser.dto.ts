import { IsNotEmpty, IsString, IsEmail, IsOptional, IsNumber, Min } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

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
    avatar?: string; // URL de imagen

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    favoriteArtists?: string[]; // Lista de artistas favoritos

    @IsOptional()
    attendedConcerts?: string[]; // Lista de eventos asistidos

    @IsOptional()
    friends?: string[]; // Lista de IDs de amigos

    @IsOptional()
    settings?: Record<string, any>; // Configuraciones personalizadas
}
