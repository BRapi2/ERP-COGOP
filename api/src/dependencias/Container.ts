import "reflect-metadata";
import { container } from "tsyringe";
import { registerAllDependencies } from "./index";

registerAllDependencies();

export { container };