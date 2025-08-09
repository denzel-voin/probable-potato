import { Injectable } from '@nestjs/common';
import {User} from "./user.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateUserDTO} from "./dto/create-user.dto";
import {RolesService} from "../roles/roles.service";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private  userRepository: typeof User,
                private rolesService: RolesService) {}
    async createUser(dto: CreateUserDTO) {
        const user = await this.userRepository.create(dto);
        const role = await this.rolesService.getRoleByValue('USER')
        if (role) {
            await user.$set('roles', [role.id])
            user.roles = [role]
        }
        return user;
    }

    async findAll() {
        const users = await this.userRepository.findAll({include: {all: true}});
        return users;
    }

    async getUserByLogin(login: string) {
        const user = await this.userRepository.findOne({where: {login}, include: {all: true}})
        return user;
    }
}
