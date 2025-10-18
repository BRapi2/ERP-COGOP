import { injectable, inject } from 'tsyringe';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { LoginDto, LoginResponseDto, MenuItemDto } from '../dtos/core/auth.dto';
import fs from 'fs';
import { configuracionTabla } from '../models/core/configuracionTabla.models';
import { IAuthRepository } from './IAuth.repository';
import { MenuModel } from '../modules/core/menu/infraestructure/model/menu.models';
import { LogService } from "../utils/log.service";

const key = fs.readFileSync('jwtRS256.key');

@injectable()
export class AuthService {
  constructor(@inject('IAuthRepository') private repository: IAuthRepository) { }

  private mapMenuToDto(menuItem: MenuModel, allTableConfigs: configuracionTabla[], rolId: number): MenuItemDto {
    const config = allTableConfigs.find(item => item.menu_id?.id === menuItem.id);
    const total = Number(config?.total_datos ?? 10);

    return {
      order: menuItem.order,
      nombre: menuItem.nombre,
      url: menuItem.url,
      parent: menuItem.parent_id,
      rol: rolId,
      classs_change: menuItem.classs_change || "",
      iconStyle: menuItem.iconStyle || "",
      children: menuItem.children?.map(child => this.mapMenuToDto(child, allTableConfigs, rolId)) || [],
      total
    };
  }

  async login(credentials: LoginDto): Promise<LoginResponseDto> {
    try {
      const user = await this.repository.findUserByUsername(credentials.username);
      if (!user) {
        throw new Error('Usuario no encontrado o inactivo');
      }

      const passwordMatch = await bcrypt.compare(credentials.password, user.password);
      if (!passwordMatch) {
        throw new Error('Contraseña incorrecta');
      }

      const menuItems = await this.repository.getUserMenu(user.rol.id);
      const tableConfigs = await this.repository.getTableConfigs();

      return {
        rol: user.rol.id,
        email: user.username,
        expiresIn: 36000,
        token: jwt.sign({ data: user.id, role: user.rol.nombre }, key, { algorithm: 'RS256', expiresIn: '10h' }),
        menu: menuItems.map(item => this.mapMenuToDto(item, tableConfigs, user.rol.id)),
        iglesia: user.iglesia.id
      };
    } catch (error) {
      LogService.logError("CONTROLLER_LOGIN", error.message, error);
      throw new Error(error);
    }

  }
}