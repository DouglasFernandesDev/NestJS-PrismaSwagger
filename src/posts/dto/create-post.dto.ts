import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ description: 'Título do post é requerido', required: true })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Conteúdo do post é opcional' })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiProperty({ description: 'Email do autor do post', required: true })
  @IsEmail()
  authorEmail: string;
}
