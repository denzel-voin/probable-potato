import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {SequelizeModule} from '@nestjs/sequelize';
import * as process from "node:process";
import {User} from "./users/user.model";
import {UsersModule} from "./users/users.module";

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
            models: [User],
            autoLoadModels: true,
        }),
    ],
})
export class AppModule {
}
