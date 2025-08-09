import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateUserDTO} from "../users/dto/create-user.dto";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs';
import {User} from "../users/user.model";

@Injectable()
export class AuthService {

    constructor(private readonly usersService: UsersService,
                private readonly jwtService: JwtService) {
    }

    async login(userDto: CreateUserDTO) {
        const user = await this.validateUser(userDto);
        return this.generateToken(user);
    }

    async register(registerDto: CreateUserDTO) {
        const user = await this.usersService.getUserByLogin(registerDto.login);
        if (user) {
            throw new HttpException('Такой логин уже занят', HttpStatus.BAD_REQUEST);
        }

        const hashPassword = await bcrypt.hash(registerDto.password, 5);
        const newUser = await this.usersService.createUser({...registerDto, password: hashPassword});
        return this.generateToken(newUser);
    }

    private async generateToken(user: User) {
        const payload = {login: user.login, id: user.id, roles: user.roles,}
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(loginDto: CreateUserDTO) {
        const user = await this.usersService.getUserByLogin(loginDto.login);
        const passwordEqual = await bcrypt.compare(loginDto.password, user!.getDataValue('password'));
        if (user && passwordEqual) {
            return user;
        } else throw new HttpException({message: 'Логин или пароль не совпадают'}, HttpStatus.BAD_REQUEST);
    }
}
