import "reflect-metadata";
import { injectable, inject } from "tsyringe";
import { FindManyOptions } from "typeorm";
import { validate } from "class-validator";
import { UserEntity } from "../../domain/entities/User.entity";
import { UserDto } from "../dto/User.dto";
import { IUserRepository } from "../../domain/repositories/IUser.repository";
import { ConflictError, NotFoundError } from "../../../../../errors/custom.errors";

@injectable()
export class UserService {
    constructor(
        @inject('IUserRepository') private repository: IUserRepository
    ) { }

    public async listAll(): Promise<UserEntity[]> {
        return this.repository.findAll();
    }

    public async list(options: FindManyOptions<UserEntity>): Promise<[UserEntity[], number]> {
        return this.repository.findAndCount(options);;
    }

    public async searchAndCount(
        search: string,
        options: FindManyOptions<UserEntity>
    ): Promise<[UserEntity[], number]> {
        const normalizedOrder = this.normalizeOrder(options?.order);
        return this.repository.searchUsers(search, {
            skip: options?.skip,
            take: options?.take,
            order: normalizedOrder,
        });
    }

    private normalizeOrder(order?: { [key: string]: any }): { [key: string]: "ASC" | "DESC" } | undefined {
        if (!order) return undefined;
        const normalized: { [key: string]: "ASC" | "DESC" } = {};
        for (const key in order) {
            const value = order[key];
            if (typeof value === "string") {
                normalized[key] = value.toUpperCase() === "ASC" ? "ASC" : "DESC";
            }
        }
        return normalized;
    }

    public async getById(id: number): Promise<UserEntity> {
        const user = await this.repository.findById(id);
        if (!user) {
            throw new NotFoundError(`Usuario con ID ${id} no encontrado`);
        }
        return user;
    }

    public async create(dto: UserDto): Promise<UserEntity> {
        await this.validateDto(dto);
        await this.validateUniqueUsername(dto.username);

        const newUser = UserEntity.crear({
            ...dto,
            perfil: dto.perfil,
            rol: dto.rol,
            estado: dto.estado,
            iglesia: dto.iglesia,
        });

        return this.repository.save(newUser);
    }

    public async update(id: number, dto: UserDto): Promise<UserEntity> {
        await this.validateDto(dto);
        const existingUser = await this.getById(id);

        if (dto.username !== existingUser.username) {
            await this.validateUniqueUsername(dto.username, id);
        }

        const updatedUser = UserEntity.crear({
            ...dto,
            perfil: dto.perfil,
            rol: dto.rol,
            estado: dto.estado,
            iglesia: dto.iglesia,
        });

        return this.repository.save(updatedUser);
    }

    public async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }

    private async validateDto(dto: UserDto): Promise<void> {
        const errors = await validate(dto);
        if (errors.length > 0) {
            const messages = errors.map(e => Object.values(e.constraints || {})).flat();
            throw new ConflictError(`Datos inválidos: ${messages.join(', ')}`);
        }
    }

    private async validateUniqueUsername(username: string, excludeId?: number): Promise<void> {
        const existing = await this.repository.findByUsername(username);
        if (existing && (!excludeId || existing.id !== excludeId)) {
            throw new ConflictError(`Ya existe un usuario con el username '${username}'`);
        }
    }
}
