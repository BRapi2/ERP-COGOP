import { registerCoreDependencies } from "./Core.dependencies";
import { registerContadorDependencies } from "./Contador.dependencies";
import { registerReportesDependencies } from "./Reportes.dependencies";

export const registerAllDependencies = () => {
  registerCoreDependencies();
  registerContadorDependencies();
  registerReportesDependencies();
};