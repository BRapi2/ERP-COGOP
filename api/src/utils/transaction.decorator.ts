import { IsolationLevel } from "typeorm/driver/types/IsolationLevel";
import { AppDataSource2 } from "../db";

export function Transactional(isolationLevel: IsolationLevel = "SERIALIZABLE") {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        
        descriptor.value = async function(...args: any[]) {
            const queryRunner = AppDataSource2.createQueryRunner();
            await queryRunner.connect();
            await queryRunner.startTransaction(isolationLevel);
            
            try {
                const result = await originalMethod.apply(this, args);
                await queryRunner.commitTransaction();
                return result;
            } catch (error) {
                await queryRunner.rollbackTransaction();
                throw error;
            } finally {
                await queryRunner.release();
            }
        };
    };
}