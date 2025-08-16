import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import {UsersService} from "./users.service";
import {CreateUserDTO} from "./dto/create-user.dto";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "./user.model";
import {AuthGuard} from "../auth/jwt-auth.guard";

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}
    @ApiOperation({summary: 'Создание пользователя'})
    @ApiResponse({status: 200, type: User})
    @Post()
    create(@Body() userDTO: CreateUserDTO) {
        return this.userService.createUser(userDTO)
    }

    @ApiOperation({summary: 'Получение списка всех пользователей'})
    @ApiResponse({status: 200, type: [User]})
    @UseGuards(AuthGuard)
    @Get()
    getAll() {
        return this.userService.findAll();
    }
}
