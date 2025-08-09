import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {SequelizeModule} from '@nestjs/sequelize';
import * as process from "node:process";
import {User} from "./users/user.model";
import {UsersModule} from "./users/users.module";
import { RolesModule } from './roles/roles.module';
import {Role} from "./roles/roles.model";
import {UserRoles} from "./roles/user-roles.model";
import {AuthModule} from "./auth/auth.module";

@Module({
    imports: [
        UsersModule,
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: 'localhost',
            port: 5432,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: 'potato',
            models: [User, Role, UserRoles],
            autoLoadModels: true,
        }),
        RolesModule,
        AuthModule,
    ],
})
export class AppModule {
}
