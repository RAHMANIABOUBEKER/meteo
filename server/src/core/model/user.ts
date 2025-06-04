import { IsEmail, IsEnum, IsOptional, IsPhoneNumber, IsString, Length } from 'class-validator';
import { UserRole } from './user-role';

export class UserDTO {
  @IsString()
  @Length(2, 50)
  firstName: string;

  @IsString()
  @Length(2, 50)
  lastName: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber('FR')
  @IsOptional()
  phoneNumber?: string;

  @IsEnum(UserRole)
  role: UserRole;

  @IsString()
  @Length(8, 100)
  password: string;

  @IsOptional()
  @IsString()
  profilePictureUrl?: string;

  @IsOptional()
  @IsString()
  pharmacyId?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  isActive: boolean = true;
}
