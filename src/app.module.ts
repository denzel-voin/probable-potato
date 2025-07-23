import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {SequelizeModule} from '@nestjs/sequelize';
import * as process from "node:process";

@Module({
    imports: [
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
            models: [],
            autoLoadModels: true,
        }),
    ],
})
export class AppModule {
}
