import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BaseEntity } from "typeorm";

export enum LogLevel {
    INFO = "INFO",
    ERROR = "ERROR",
    WARN = "WARN",
}

@Entity({ name: "logs" })
export class Log extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ type: "timestamp" })
    timestamp: Date;

    @Column({
        type: "enum",
        enum: LogLevel,
        default: LogLevel.INFO
    })
    level: LogLevel;

    @Column({ type: "varchar", length: 100 })
    operation: string;

    @Column({ type: "varchar", length: 255 })
    message: string;

    @Column({ type: "json", nullable: true })
    data: object | null;

    @Column({ name: "user_id", nullable: true })
    userId: number | null;
}