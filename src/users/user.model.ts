import { Column, DataType, Model, Table, PrimaryKey, AutoIncrement } from "sequelize-typescript";

interface UserCreationInterface {
    login: string;
    password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationInterface> {

    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.INTEGER, unique: true })
    declare id: number;

    @Column({ type: DataType.STRING, allowNull: false, unique: true })
    login: string;

    @Column({ type: DataType.STRING, allowNull: false })
    password: string;

    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    banned: boolean;

    @Column({ type: DataType.STRING, allowNull: true })
    banReason: string;
}
