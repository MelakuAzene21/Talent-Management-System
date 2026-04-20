import { IsString, IsEmail, IsInt, Min, Max, IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTalentDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(2, 100)
  fullName: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  primarySkill: string;

  @ApiProperty()
  @IsInt()
  @Min(0)
  @Max(50)
  yearsOfExperience: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(10, 500)
  description: string;
}