import { IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  institutionalEmail: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
