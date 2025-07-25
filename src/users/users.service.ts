import { Injectable } from '@nestjs/common';
import {User} from "./user.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateUserDTO} from "./dto/create-user.dto";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private  userRepository: typeof User) {}
    async createUser(dto: CreateUserDTO) {
        const user = await this.userRepository.create(dto);
        return user;
    }

    async findAll() {
        const users = await this.userRepository.findAll();
        return users;
    }
}
