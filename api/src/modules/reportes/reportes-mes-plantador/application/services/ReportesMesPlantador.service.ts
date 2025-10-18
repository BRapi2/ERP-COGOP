import "reflect-metadata";
import { injectable, inject } from "tsyringe";
import { FindManyOptions } from "typeorm";
import { validate } from "class-validator";
import { IReportesMesPlantadorRepository } from "../../domain/repositories/IReportesMesPlantador.repository";
import { ReportesMesPlantadorEntity } from "../../domain/entities/reportes-mes-plantador.entity";
import { ReportesMesPlantadorDto } from "../dto/ReportesMesPlantador.dto";
import { ConflictError, NotFoundError } from "../../../../../errors/custom.errors";
import { ReportesMesPlantadorModel } from "../../infraestructure/model/reportes-mes-plantador.models";

@injectable()
export class ReportesMesPlantadorService {
    constructor(
        @inject('IReportesMesPlantadorRepository') private repository: IReportesMesPlantadorRepository,
    ) { }

    public async list(options: FindManyOptions<ReportesMesPlantadorModel>): Promise<[ReportesMesPlantadorEntity[], number]> {
        return await this.repository.findAndCount(options);
    }

    public async listAll(): Promise<ReportesMesPlantadorEntity[]> {
        return await this.repository.findAll();
    }

    public async getById(id: number): Promise<ReportesMesPlantadorEntity> {
        const entity = await this.repository.findById(id);
        if (!entity) {
            throw new NotFoundError(`Reporte Mes Plantador con ID ${id} no encontrado`);
        }
        return entity;
    }

    public async create(dto: ReportesMesPlantadorDto): Promise<ReportesMesPlantadorEntity> {
        await this.validateDto(dto);
        const newEntity = ReportesMesPlantadorEntity.crear(dto);
        return await this.repository.save(newEntity);
    }

    public async update(id: number, dto: ReportesMesPlantadorDto): Promise<ReportesMesPlantadorEntity> {
        await this.validateDto(dto);
        const existing = await this.getById(id);
        const updatedEntity = ReportesMesPlantadorEntity.crear({ ...existing, ...dto, id });
        return await this.repository.save(updatedEntity);
    }

    private async validateDto(dto: ReportesMesPlantadorDto): Promise<void> {
        const errors = await validate(dto);
        if (errors.length > 0) {
            const errorMessages = errors.map(e => Object.values(e.constraints || {})).flat();
            throw new ConflictError(`Datos inválidos: ${errorMessages.join(', ')}`);
        }
    }
}
