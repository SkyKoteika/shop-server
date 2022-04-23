import { DataSource } from "typeorm";
import Category from "../models/Category";
import ShopItem from "../models/ShopItem";
import User from "../models/User";
import dotenv = require('dotenv');

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: true,
    entities: [User, Category, ShopItem],
    subscribers: [],
    migrations: [],
})

AppDataSource.initialize()
.then(() => {
    console.log("initialized")
})
.catch(error => console.error(error));