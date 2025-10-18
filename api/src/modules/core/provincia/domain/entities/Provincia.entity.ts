import { DepartamentoDto } from "../../application/dto/Departamento.dto";

export class ProvinciaEntity {
    private constructor(
        public readonly id: number | undefined,
        public readonly nombre: string,
        public readonly departamento: DepartamentoDto
    ) { }

    public static crear({ id, nombre, departamento }: { id?: number; nombre: string; departamento: DepartamentoDto }): ProvinciaEntity {
        return new ProvinciaEntity(id, nombre, departamento);
    }
}