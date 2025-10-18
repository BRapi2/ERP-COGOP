import { IsObject } from "class-validator";

export class ReportDto {
    @IsObject({ message: "El campo 'data' debe ser un objeto JSON válido." })
    data!: Record<string, any>;
}
