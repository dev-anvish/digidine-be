import { IsString } from 'class-validator';

export class CreateAuthDto {
  @IsString() mobileNo: string;
  @IsString() name: string;
}
