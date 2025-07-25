import {Body, Controller, Get, Post} from '@nestjs/common';
import {UsersService} from "./users.service";
import {CreateUserDTO} from "./dto/create-user.dto";

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}
    @Post()
    create(@Body() userDTO: CreateUserDTO) {
        return this.userService.createUser(userDTO)
    }

    @Get()
    getAll() {
        return this.userService.findAll();
    }
}
