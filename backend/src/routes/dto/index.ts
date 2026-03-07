import { IsString, IsNumber, IsObject, IsArray, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRouteDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsObject()
  geoJson: any;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsString()
  region: string;

  @ApiProperty()
  @IsString()
  category: string;

  @ApiProperty({ type: [String], required: false })
  @IsArray()
  @IsOptional()
  mediaUrls?: string[];

  @ApiProperty({ default: false })
  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;
}

export class SearchRoutesDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  region?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  maxPrice?: string;
}
