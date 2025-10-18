
//GENERALES
import { Usuario } from './user.models'
import { UsuarioModel } from '../../modules/core/user/infraestructure/model/User.models'
import { DepartamentoModel } from '../../modules/core/departamento/infrastructure/model/Departamento.models'
import { configuracionTabla } from './configuracionTabla.models'
import { Presbiterio } from './presbiterio.model'
import { Log } from './log.models'
import { RolModel } from '../../modules/core/rol/infraestructure/model/rol.models'
import { MenuModel } from '../../modules/core/menu/infraestructure/model/menu.models';
import { ProvinciaModel } from '../../modules/core/provincia/infrastructure/model/Provincia.model'
import { DistritoModel } from '../../modules/core/distrito/infrastructure/model/Distrito.model'
import { EstadoModel } from '../../modules/core/estado/infraestructure/model/estado.models'
import { TipoDocumentoModel } from '../../modules/contador/tipo-documento/infrastructure/model/TipoDocumento.model'
import { IglesiaModel } from '../../modules/core/iglesia/infraestructure/model/iglesia.models'
import { PerfilModel } from '../../modules/core/perfil/infraestructure/model/perfil.models'

export const entitiesGenerales = [
    Usuario,
    UsuarioModel,
    RolModel,
    EstadoModel,
    PerfilModel,
    MenuModel,
    IglesiaModel,
    DepartamentoModel,
    ProvinciaModel,
    DistritoModel,
    configuracionTabla,
    TipoDocumentoModel,
    Presbiterio,
    Log
];
