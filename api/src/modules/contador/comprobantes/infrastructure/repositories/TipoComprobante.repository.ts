import { TipoComprobanteModel } from "../model/TipoComprobante.models";
import { FindManyOptions, Not, Repository } from "typeorm";
import { injectable } from "tsyringe";
import { ITipoComprobanteRepository } from "../../domain/repositories/ITipoComprobante.repository";
import { AppDataSource2 } from "../../../../../db";
import { ComprobanteMapping } from "../persistence/comprobante.mapping";
import { TipoComprobante } from "../../domain/entities/comprobante.entity";

@injectable()
export class TipoComprobanteRepository implements ITipoComprobanteRepository {

    private readonly ormRepository: Repository<TipoComprobanteModel>;

    constructor() {
        this.ormRepository = AppDataSource2.getRepository(TipoComprobanteModel);
    }

    async obtenerTipoComprobante(): Promise<TipoComprobante[]> {
        const model = await this.ormRepository.find();
        return model.map(ComprobanteMapping.toEntity);
    }

    async findAndCount(options?: FindManyOptions<TipoComprobanteModel>): Promise<[TipoComprobante[], number]> {
        const [models, count] = await this.ormRepository.findAndCount(options);
        const entities = models.map(ComprobanteMapping.toEntity);
        return [entities, count];
    }

    async findById(id: number): Promise<TipoComprobante | null> {
        const model = await this.ormRepository.findOneBy({ id });
        return model ? ComprobanteMapping.toEntity(model) : null;
    }

    async findByNombre(nombre: string): Promise<TipoComprobante | null> {
        const model = await this.ormRepository.findOneBy({ nombre });
        return model ? ComprobanteMapping.toEntity(model) : null;
    }

    async findDuplicate(id: number, nombre: string): Promise<TipoComprobante | null> {
        const where: any = { nombre };
        if (id) {
            where.id = Not(id);
        }
        const model = await this.ormRepository.findOne({ where });
        return model ? ComprobanteMapping.toEntity(model) : null;
    }

    async save(tipoComprobante: TipoComprobante): Promise<TipoComprobante> {
        const model = ComprobanteMapping.toModel(tipoComprobante);
        const savedModel = await this.ormRepository.save(model);
        return ComprobanteMapping.toEntity(savedModel);
    }
}