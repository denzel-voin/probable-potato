import {Column, DataType, Model, Table, PrimaryKey, AutoIncrement, BelongsToMany} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../users/user.model";
import {UserRoles} from "./user-roles.model";

interface RoleCreationInterface {
    value: string;
    description: string;
}

@Table({ tableName: 'roles' })
export class Role extends Model<Role, RoleCreationInterface> {

    @PrimaryKey
    @AutoIncrement
    @ApiProperty({ example: '1', description: 'ID пользователя' })
    @Column({ type: DataType.INTEGER, unique: true })
    declare id: number;

    @ApiProperty({ example: 'ADMIN', description: 'Значение роли пользователя' })
    @Column({ type: DataType.STRING, allowNull: false, unique: true })
    value: string;

    @ApiProperty({ example: 'Администратор', description: 'Описание роли' })
    @Column({ type: DataType.STRING, allowNull: false })
    description: string;

    @BelongsToMany(() => User, () => UserRoles)
    users: User[];
}
