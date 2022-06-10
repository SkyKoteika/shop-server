import { DataSource } from "typeorm";
import dotenv = require('dotenv');
import User from "../models/User";
import Category from "../models/Category";
import ShopItem from "../models/ShopItem";
import SaleSlider from "../models/SaleSlider";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [User, Category, ShopItem, SaleSlider],
    subscribers: [],
    migrations: [],
})
