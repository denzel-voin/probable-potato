import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDTO {
    @ApiProperty({ example: 'denzel94', description: 'Логин пользователя' })
    readonly login: string;
    @ApiProperty({ example: 'pass228', description: 'Пароль пользователя' })
    readonly password: string;
}