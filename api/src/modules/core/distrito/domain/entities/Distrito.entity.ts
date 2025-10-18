import { ProvinciaDto } from "../../application/dto/Provincia.dto";

export class DistritoEntity {
    private constructor(
        public readonly id: number | undefined,
        public readonly nombre: string,
        public readonly provincia: ProvinciaDto
    ) { }

    public static crear(props: { id?: number; nombre: string; provincia: ProvinciaDto }): DistritoEntity {
        return new DistritoEntity(props.id, props.nombre, props.provincia);
    }
}