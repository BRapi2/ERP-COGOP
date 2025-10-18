import { VoucherEntity } from "../entities/Voucher.entity";
import { FindOneOptions, FindManyOptions } from "typeorm";
import { VoucherModel } from "../../infrastructure/model/Voucher.models";

export interface IVoucherRepository {
    findById(options: FindOneOptions<VoucherModel>): Promise<VoucherEntity | null>;
    save(voucher: VoucherEntity): Promise<VoucherEntity>;
    findAndCount(options: FindManyOptions<VoucherEntity>): Promise<[VoucherEntity[], number]>;
    findOne(options: FindOneOptions<VoucherModel>): Promise<VoucherEntity | null>;
}