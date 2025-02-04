import { IsNotEmpty, IsString, IsDateString, IsNumber, IsArray, IsOptional, IsBoolean } from "class-validator";

export class CreateConcertDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    artist: string;

    @IsNotEmpty()
    @IsDateString()
    date: string; // Fecha en formato ISO 8601

    @IsNotEmpty()
    @IsString()
    location: string;

    @IsNotEmpty()
    @IsString()
    venue: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    attendees?: string[]; // Lista de IDs de usuarios

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    images?: string[];

    @IsOptional()
    @IsBoolean()
    isSoldOut?: boolean;
}
