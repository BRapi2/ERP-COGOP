import { FindOptionsOrder } from "typeorm";

export function parseSort<T extends object>(sortQuery: string | undefined, allowedFields: (keyof T)[], defaultSort: FindOptionsOrder<T>): FindOptionsOrder<T> {
    if (!sortQuery) {
        return defaultSort;
    }
    const [field, direction] = sortQuery.split(',');
    if (allowedFields.includes(field as keyof T)) {
        const normalizedDirection = direction?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
        const order = {} as FindOptionsOrder<T>;
        (order as any)[field] = normalizedDirection;
        return order;
    }
    
    return defaultSort;
}