import {
    Column,
    DataType,
    Model,
    Table,
    PrimaryKey,
    AutoIncrement,
    ForeignKey
} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../users/user.model";
import {Role} from "./roles.model";

interface RoleCreationInterface {
    value: string;
    description: string;
}

@Table({ tableName: 'user_roles', createdAt: false, updatedAt: false })
export class UserRoles extends Model<UserRoles, RoleCreationInterface> {

    @PrimaryKey
    @AutoIncrement
    @ApiProperty({ example: '1', description: 'ID пользователя' })
    @Column({ type: DataType.INTEGER, unique: true })
    declare id: number;

    @ForeignKey(() => Role)
    @Column({ type: DataType.INTEGER })
    roleId: number;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    userId: number;
}
