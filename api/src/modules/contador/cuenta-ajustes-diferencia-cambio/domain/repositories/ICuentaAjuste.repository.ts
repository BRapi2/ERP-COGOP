import { FindManyOptions } from "typeorm";
import { CuentaAjusteDiferenciaCambio } from "../../domain/entities/cuenta-ajuste-diferencia-cambio.entity";
import { YearDto } from "../../application/dto/year.dto";

type DuplicateFilter = {
    nombre?: string;
    valor?: string;
    year?: YearDto | { id: number };
    currentId?: number;
    message?: string;
    strictMode?: boolean;
};

export interface ICuentaAjusteRepository {
    findAndCount(options: FindManyOptions<CuentaAjusteDiferenciaCambio>): Promise<[CuentaAjusteDiferenciaCambio[], number]>;
    findById(id: number): Promise<CuentaAjusteDiferenciaCambio | null>;
    save(entity: CuentaAjusteDiferenciaCambio): Promise<CuentaAjusteDiferenciaCambio>;
    validateUniqueConstraints(filters: DuplicateFilter): Promise<void>;
}