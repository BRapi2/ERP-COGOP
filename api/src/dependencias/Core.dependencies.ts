
import { container } from "tsyringe";

import { AuthRepository } from "../login/Auth.repository";
import { IAuthRepository } from "../login/IAuth.repository";

import { IRolRepository } from "../modules/core/rol/domain/repositories/IRol.repository";
import { RolRepository } from "../modules/core/rol/infraestructure/repositories/Rol.repository";
import { RolService } from "../modules/core/rol/application/services/Rol.service";
import { RolController } from "../modules/core/rol/presentation/controllers/Rol.controller";

import { IMenuRepository } from "../modules/core/menu/domain/repositories/IMenu.repository";
import { MenuService } from "../modules/core/menu/application/services/Menu.service";
import { MenuController } from "../modules/core/menu/presentation/controllers/Menu.controller";
import { MenuRepository } from "../modules/core/menu/infraestructure/repositories/Menu.repository";

import { IDepartamentoRepository } from "../modules/core/departamento/domain/repositories/IDepartamento.repository";
import { DepartamentoService } from "../modules/core/departamento/application/services/Departamento.service";
import { DepartamentoController } from "../modules/core/departamento/presentation/controllers/Departamento.controller";
import { DepartamentoRepository } from "../modules/core/departamento/infrastructure/repositories/Departamento.repository";

import { IProvinciaRepository } from "../modules/core/provincia/domain/repositories/IProvincia.repository";
import { ProvinciaService } from "../modules/core/provincia/application/services/Provincia.service";
import { ProvinciaController } from "../modules/core/provincia/presentation/controllers/Provincia.controller";
import { ProvinciaRepository } from "../modules/core/provincia/infrastructure/repositories/Provincia.repository";

import { IDistritoRepository } from "../modules/core/distrito/domain/repositories/IDistrito.repository";
import { DistritoService } from "../modules/core/distrito/application/services/Distrito.service";
import { DistritoController } from "../modules/core/distrito/presentation/controllers/Distrito.controller";
import { DistritoRepository } from "../modules/core/distrito/infrastructure/repositories/Distrito.repository";

import { EstadoController } from "../modules/core/estado/presentation/controllers/Estado.controller";
import { EstadoService } from "../modules/core/estado/application/services/Estado.service";
import { IEstadoRepository } from "../modules/core/estado/domain/repositories/IEstado.repository";
import { EstadoRepository } from "../modules/core/estado/infraestructure/repositories/Estado.repository";

import { IIglesiaRepository } from "../modules/core/iglesia/domain/repositories/IIglesia.repository";
import { IglesiaRepository } from "../modules/core/iglesia/infraestructure/repositories/Iglesia.repository";
import { IglesiaService } from "../modules/core/iglesia/application/services/Iglesia.service";
import { IglesiaController } from "../modules/core/iglesia/presentation/controllers/Iglesia.controller";

export const registerCoreDependencies = () => {
  container.register<IAuthRepository>('IAuthRepository', { useClass: AuthRepository });
  //DEPARTAMENTO
  container.register<IDepartamentoRepository>("IDepartamentoRepository", { useClass: DepartamentoRepository });
  container.register(DepartamentoService, { useClass: DepartamentoService });
  container.register(DepartamentoController, { useClass: DepartamentoController });
  //PROVINCIA
  container.register<IProvinciaRepository>("IProvinciaRepository", { useClass: ProvinciaRepository });
  container.register(ProvinciaService, { useClass: ProvinciaService });
  container.register(ProvinciaController, { useClass: ProvinciaController });
  //DISTRITO
  container.register<IDistritoRepository>("IDistritoRepository", { useClass: DistritoRepository });
  container.register(DistritoService, { useClass: DistritoService });
  container.register(DistritoController, { useClass: DistritoController });
  //ROL
  container.register<IRolRepository>("IRolRepository", { useClass: RolRepository });
  container.register(RolService, { useClass: RolService });
  container.register(RolController, { useClass: RolController });
  //MENU
  container.register<IMenuRepository>("IMenuRepository", { useClass: MenuRepository });
  container.register(MenuService, { useClass: MenuService });
  container.register(MenuController, { useClass: MenuController });

  // ESTADO
  container.register<IEstadoRepository>("IEstadoRepository", { useClass: EstadoRepository });
  container.register(EstadoService, { useClass: EstadoService });
  container.register(EstadoController, { useClass: EstadoController });

  // IGLESIA
  container.register<IIglesiaRepository>("IIglesiaRepository", { useClass: IglesiaRepository });
  container.register(IglesiaService, { useClass: IglesiaService });
  container.register(IglesiaController, { useClass: IglesiaController });

};