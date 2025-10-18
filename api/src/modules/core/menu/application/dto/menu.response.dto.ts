import { RolResponseDto } from "../../../rol/application/dto/rol.response.dto";

export class MenuResponseDto {
    id: number;
    order: number;
    nombre: string;
    url: string;
    parentId: number;
    rol: RolResponseDto;
}
