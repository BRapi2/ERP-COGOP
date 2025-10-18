import { Usuario } from "../models/core/user.models";
import { configuracionTabla } from "../models/core/configuracionTabla.models";
import { MenuModel } from "../modules/core/menu/infraestructure/model/menu.models";


export interface IAuthRepository {
  findUserByUsername(username: string): Promise<Usuario | null>;
  getUserMenu(rolId: number): Promise<MenuModel[]>;
  getTableConfigs(): Promise<configuracionTabla[]>;
}