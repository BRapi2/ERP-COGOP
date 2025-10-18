import { app } from "@azure/functions";

//import { getListarIglesias, getListarIglesiaId, addIglesia } from '../base/core/iglesia'

//ESTUDIO
import { buscarAgent } from '../modules/estudio/index'
app.http('general_estudio', { route: "v1/estudio/estudio", methods: ['POST'], authLevel: 'anonymous', handler: buscarAgent });

//LOGIN
import { login } from '../login/Login';
app.http('general_login', { route: "v1/login/login", methods: ['POST'], authLevel: 'anonymous', handler: login });

// PERFIL
import { getListarPerfiles, savePerfil } from '../modules/core/perfil/presentation/routes/Perfil.route';
app.http('general_perfil_listar', { route: "v1/perfil/lista", methods: ['GET'], authLevel: 'anonymous', handler: getListarPerfiles });
app.http('general_perfil_agregar', { route: "v1/perfil/guardar", methods: ['POST'], authLevel: 'anonymous', handler: savePerfil });

// USER
import { getListarUsuarios, saveUsuario, getListarId } from '../modules/core/user/presentation/routes/User.route';
app.http('general_usuario_listar', { route: "v1/user/lista", methods: ['GET'], authLevel: 'anonymous', handler: getListarUsuarios });
app.http('general_usuario_agregar', { route: "v1/user/guardar", methods: ['POST'], authLevel: 'anonymous', handler: saveUsuario });
app.http('general_usuario_agregar_rol', { route: "v1/user/listar-rol", methods: ['POST'], authLevel: 'anonymous', handler: getListarId });

// DEPARTAMENTOS
import { getListarDepartamentos, saveDepartamento } from '../modules/core/departamento/presentation/routes/Departamento.route';
app.http('general_departamenos_llistar', { route: "v1/departamento/lista", methods: ['GET'], authLevel: 'anonymous', handler: getListarDepartamentos });
app.http('general_departamenos_agregar', { route: "v1/departamento/guardar", methods: ['POST'], authLevel: 'anonymous', handler: saveDepartamento });

// PROVINCIA
import { getListarProvincias, saveProvincia } from '../modules/core/provincia/presentation/routes/Provincia.routes';
app.http('general_provincia_llistar', { route: "v1/provincia/lista", methods: ['GET'], authLevel: 'anonymous', handler: getListarProvincias });
app.http('general_provincia_agregar', { route: "v1/provincia/guardar", methods: ['POST'], authLevel: 'anonymous', handler: saveProvincia });

// DISTRITO
import { getListarDistritos, saveDistrito } from '../modules/core/distrito/presentation/routes/Distrito.routes';
app.http('general_distrito_llistar', { route: "v1/distrito/lista", methods: ['GET'], authLevel: 'anonymous', handler: getListarDistritos });
app.http('general_distrito_agregar', { route: "v1/distrito/guardar", methods: ['POST'], authLevel: 'anonymous', handler: saveDistrito });

// ROL
import { getListarRoles, addRol } from '../modules/core/rol/presentation/routes/Rol.route';
app.http('general_rol_listar', { route: "v1/rol/lista", methods: ['GET'], authLevel: 'anonymous', handler: getListarRoles });
app.http('general_rol_agregar', { route: "v1/rol/guardar", methods: ['POST'], authLevel: 'anonymous', handler: addRol });

// MENU
import { getListarMenus, addMenu } from '../modules/core/menu/presentation/routes/Menu.route';
app.http('general_menu_listar', { route: "v1/menu/lista", methods: ['GET'], authLevel: 'anonymous', handler: getListarMenus });
app.http('general_menu_agregar', { route: "v1/menu/guardar", methods: ['POST'], authLevel: 'anonymous', handler: addMenu });
/// ESTADO
import { getListarEstados, saveEstado } from "../modules/core/estado/presentation/routes/Estado.route";
app.http('general_estado_listar', { route: "v1/estado/lista", methods: ['GET'], authLevel: 'anonymous', handler: getListarEstados });
app.http('general_estado_guardar', { route: "v1/estado/guardar", methods: ['POST'], authLevel: 'anonymous', handler: saveEstado });

// IGLESIAS
import { getListarIglesia, saveIglesia } from "../modules/core/iglesia/presentation/routes/Iglesia.route";
app.http('general_iglesia_listar', { route: "v1/iglesia/lista", methods: ['GET'], authLevel: 'anonymous', handler: getListarIglesia });
app.http('general_iglesia_guardar', { route: "v1/iglesia/guardar", methods: ['POST'], authLevel: 'anonymous', handler: saveIglesia });

import { generateReport } from "../jsreport/Report.route";
app.http("generate_report", { route: "v1/report/pdf", methods: ["POST"], authLevel: "anonymous", handler: generateReport, });


/*
app.http('general_usuario_listar_id', { route: "v1/usuario/listar/{id:int}", methods: ['GET'], authLevel: 'anonymous', handler: getListarUsuarioId });
app.http('general_usuario_agregar', { route: "v1/usuario/agregar", methods: ['POST'], authLevel: 'anonymous', handler: addUsuario });
app.http('general_usuario_listar_persona', { route: "v1/usuario/persona/all/listar", methods: ['GET'], authLevel: 'anonymous', handler: getPersonas });
app.http('general_usuario_listar_persona_id', { route: "v1/usuario/persona/all/listar/{id:int}", methods: ['GET'], authLevel: 'anonymous', handler: getPersonaId });
app.http('general_usuario_listar_persona_agregar', { route: "v1/usuario/persona/all/agregar", methods: ['POST'], authLevel: 'anonymous', handler: addPersona });

app.http('general_iglesia_listar', { route: "v1/iglesia/listar", methods: ['GET'], authLevel: 'anonymous', handler: getListarIglesias });
app.http('general_iglesia_listar_id', { route: "v1/iglesia/listar/{id:int}", methods: ['GET'], authLevel: 'anonymous', handler: getListarIglesiaId });
app.http('general_iglesia_agregar', { route: "v1/iglesia/agregar", methods: ['POST'], authLevel: 'anonymous', handler: addIglesia });
*/


