import { VoucherEntity } from "../../domain/entities/Voucher.entity";
import { FindManyOptions, FindOneOptions, Repository } from "typeorm";
import { injectable } from "tsyringe";
import { IVoucherRepository } from "../../domain/repositories/IVoucher.repository";
import { AppDataSource2 } from "../../../../../db";
import { VoucherMapping } from "../persistence/voucher.mapping";
import { VoucherModel } from "../model/Voucher.models";

@injectable()
export class VoucherRepository implements IVoucherRepository {
    private readonly ormRepository: Repository<VoucherModel>;

    constructor() {
        this.ormRepository = AppDataSource2.getRepository(VoucherModel);
    }

    async findAndCount(options?: FindManyOptions<VoucherModel>): Promise<[VoucherEntity[], number]> {
        const [models, count] = await this.ormRepository.findAndCount(options);
        return [models.map(VoucherMapping.toEntity), count];
    }

    async findById(options: FindOneOptions<VoucherModel>): Promise<VoucherEntity | null> {
        const model = await this.ormRepository.findOne(options);
        return model ? VoucherMapping.toEntity(model) : null;
    }

    async findOne(options: FindOneOptions<VoucherModel>): Promise<VoucherEntity | null> {
        const model = await this.ormRepository.findOne(options);
        return model ? VoucherMapping.toEntity(model) : null;
    }

    async save(entity: VoucherEntity): Promise<VoucherEntity> {
        const model = VoucherMapping.toModel(entity);
        const savedModel = await this.ormRepository.save(model);
        return VoucherMapping.toEntity(savedModel);
    }
}