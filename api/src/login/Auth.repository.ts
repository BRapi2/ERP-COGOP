import { injectable } from 'tsyringe';
import { Usuario } from '../models/core/user.models';
import { configuracionTabla } from '../models/core/configuracionTabla.models';
import { IAuthRepository } from './IAuth.repository';
import { MenuModel } from '../modules/core/menu/infraestructure/model/menu.models';


@injectable()
export class AuthRepository implements IAuthRepository {
  async findUserByUsername(username: string): Promise<Usuario | null> {
    return await Usuario.findOne({
      relations: { perfil: true, rol: true, iglesia: true },
      where: { username, estado: { id: 1 } }
    });
  }

  async getUserMenu(rolId: number): Promise<MenuModel[]> {
    return await MenuModel.find({
      relations: { children: { children: true } },
      where: { rol_id: rolId, parent_id: 0 },
      order: { order: "ASC" }
    });
  }

  async getTableConfigs(): Promise<configuracionTabla[]> {
    return await configuracionTabla.find({ relations: { menu_id: true } });
  }
}