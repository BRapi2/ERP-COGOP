import { FindManyOptions } from "typeorm";
import { UserEntity } from "../entities/User.entity";

export interface IUserRepository {
    findAll(): Promise<UserEntity[]>;
    findById(id: number): Promise<UserEntity | null>;
    findByUsername(username: string): Promise<UserEntity | null>;
    save(user: UserEntity): Promise<UserEntity>;
    findAndCount(options: FindManyOptions<UserEntity>): Promise<[UserEntity[], number]>;
    delete(id: number): Promise<void>;
    searchUsers(
        search: string,
        options?: { skip?: number; take?: number; order?: { [key: string]: "ASC" | "DESC" } }
    ): Promise<[UserEntity[], number]>;
}