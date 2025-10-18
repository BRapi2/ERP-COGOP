// src/application/services/Voucher.service.ts
import "reflect-metadata";
import { VoucherEntity } from "../../domain/entities/Voucher.entity";
import { VoucherDetailEntity } from "../../domain/entities/VoucherDetail.entity";
import { VoucherDto } from "../dto/voucher.dto";
import { injectable, inject } from "tsyringe";
import { FindManyOptions, FindOneOptions } from "typeorm";
import { NotFoundError } from '../../../../../errors/custom.errors';
import { IVoucherRepository } from "../../domain/repositories/IVoucher.repository";
import { VoucherModel } from "../../infrastructure/model/Voucher.models";

@injectable()
export class VoucherService {
    constructor(@inject('IVoucherRepository') private repository: IVoucherRepository) { }

    public async list(options: FindManyOptions<VoucherDto>): Promise<[VoucherEntity[], number]> {
        return this.repository.findAndCount(options);
    }

    public async findById(id: number): Promise<VoucherEntity> {
        const options: FindOneOptions<VoucherModel> = {
            where: { id },
            relations: ["origen", "mes", "year", "moneda", "proveedor", "tipoComprobante"]
        };
        const existing = await this.repository.findById(options);
        if (!existing) {
            throw new NotFoundError(`Voucher ${id} no encontrado`);
        }
        return existing;
    }

    public async create(dto: VoucherDto): Promise<VoucherEntity> {
        const detallesEntities = dto.detalles.map(detalleDto =>
            VoucherDetailEntity.crear(detalleDto)
        );

        const newEntity = VoucherEntity.crear({
            ...dto,
            detalles: detallesEntities
        });

        return this.repository.save(newEntity);
    }

    public async update(id: number, dto: VoucherDto): Promise<VoucherEntity> {
        const voucher = await this.findById(id);
        const detallesEntities = dto.detalles.map(detalleDto => 
            VoucherDetailEntity.crear(detalleDto)
        );
        const updatedEntity = VoucherEntity.crear({ ...voucher, ...dto, id, detalles: detallesEntities });
        return this.repository.save(updatedEntity);
    }

    public async findOrCreate(
        optionsToFindExisting: FindOneOptions<VoucherModel>,
        optionsToFindLast: FindOneOptions<VoucherModel>,
        nAsiento?: number
    ): Promise<{ action: string, data: any }> {

        if (nAsiento) {
            const existingVoucher = await this.repository.findOne(optionsToFindExisting);

            if (existingVoucher) {
                return { action: 'LOAD_VOUCHER', data: existingVoucher };
            }
        }

        const lastVoucher = await this.repository.findOne(optionsToFindLast);
        const nextAsiento = lastVoucher ? lastVoucher.nAsiento + 1 : 1;

        if (nAsiento) {
            return {
                action: 'SUGGEST_CORRELATIVO',
                data: { nAsiento: nextAsiento, message: `El asiento ${nAsiento} no existe. El siguiente correlativo es ${nextAsiento}.` }
            };
        } else {
            return {
                action: 'NEW_VOUCHER',
                data: { nAsiento: nextAsiento, message: `Nuevo asiento.` }
            };
        }
    }
}