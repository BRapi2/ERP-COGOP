import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class LoginResponseDto {
  rol: number;
  email: string;
  expiresIn: number;
  token: string;
  menu: MenuItemDto[];
  iglesia: number;
}

export class MenuItemDto {
  order: number;
  nombre: string;
  url: string;
  parent: number;
  rol: number;
  classs_change: string;
  iconStyle: string;
  children: MenuItemDto[];
  total: number;
}