import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty() firstName: string;
  @IsNotEmpty() lastName: string;
  @IsNotEmpty() countryCode: string;
  @IsNotEmpty() mobileNo: string;
  @IsNotEmpty() businessName: string;
  @IsNotEmpty() password: string;
  @IsEmail() email: string;
}
