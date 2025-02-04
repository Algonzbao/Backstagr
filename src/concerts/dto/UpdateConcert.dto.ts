import { IsOptional, IsString, IsDateString, IsNumber, IsArray, IsBoolean } from "class-validator";

export class UpdateConcertDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    artist?: string;

    @IsOptional()
    @IsDateString()
    date?: string; // Fecha en formato ISO 8601

    @IsOptional()
    @IsString()
    location?: string;

    @IsOptional()
    @IsString()
    venue?: string;

    @IsOptional()
    @IsNumber()
    price?: number;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    attendees?: string[];

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    images?: string[];

    @IsOptional()
    @IsBoolean()
    isSoldOut?: boolean;
}
