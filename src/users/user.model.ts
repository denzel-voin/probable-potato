import {Column, DataType, Model, Table, PrimaryKey, AutoIncrement, BelongsToMany} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Role} from "../roles/roles.model";
import {UserRoles} from "../roles/user-roles.model";

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
    declare login: string;

    @ApiProperty({ example: 'pass228', description: 'Пароль пользователя' })
    @Column({ type: DataType.STRING, allowNull: false })
    declare password: string;

    @ApiProperty({ example: 'true', description: 'Статус бана' })
    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    declare banned: boolean;

    @ApiProperty({ example: 'Оскорбление других пользователей', description: 'Описание бана' })
    @Column({ type: DataType.STRING, allowNull: true })
    declare banReason: string;

    @BelongsToMany(() => Role, () => UserRoles)
    declare roles: Role[];
}
