import { IsString, IsArray, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty()
  @IsString()
  content: string;

  @ApiProperty({ type: [String], required: false })
  @IsArray()
  @IsOptional()
  mediaUrls?: string[];
}
