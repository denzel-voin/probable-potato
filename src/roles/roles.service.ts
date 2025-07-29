import {Injectable} from '@nestjs/common';
import {CreateRoleDto} from "./dto/create-role.dto";
import {Role} from "./roles.model";
import {InjectModel} from "@nestjs/sequelize";

@Injectable()
export class RolesService {

    constructor(@InjectModel(Role) private readonly roleRepository: typeof Role,) {}

    async createRole(dto: CreateRoleDto) {
        const user = this.roleRepository.create(dto);
        return user;
    }

    async getRoleByValue(value: string) {
        const user = await this.roleRepository.findOne({ where: { value } });
        return user;
    }
}
