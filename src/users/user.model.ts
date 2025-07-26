import { Column, DataType, Model, Table, PrimaryKey, AutoIncrement } from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";

interface UserCreationInterface {
    login: string;
    password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationInterface> {

    @PrimaryKey
    @AutoIncrement
    @ApiProperty({ example: '1', description: 'ID пользователя' })
    @Column({ type: DataType.INTEGER, unique: true })
    declare id: number;

    @ApiProperty({ example: 'denzel94', description: 'Логин пользователя' })
    @Column({ type: DataType.STRING, allowNull: false, unique: true })
    login: string;

    @ApiProperty({ example: 'pass228', description: 'Пароль пользователя' })
    @Column({ type: DataType.STRING, allowNull: false })
    password: string;

    @ApiProperty({ example: 'true', description: 'Статус бана' })
    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    banned: boolean;

    @ApiProperty({ example: 'Оскорбление других пользователей', description: 'Описание бана' })
    @Column({ type: DataType.STRING, allowNull: true })
    banReason: string;
}
