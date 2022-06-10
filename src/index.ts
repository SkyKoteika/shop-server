import dotenv = require("dotenv");
dotenv.config();
console.info("dotenv configured");

import "reflect-metadata";
import express = require("express");
import { AppDataSource } from "./database";
import Category from "./models/Category";
import ItemsController from "./api/items";
import AuthController from "./api/auth";
import UserController from "./api/user";
import cors = require("cors");
import SaleSlider from "./models/SaleSlider";

AppDataSource.initialize()
  .then(() => {
    console.log("initialized");
  })
  .catch((error) => console.error(error));


const app = express();
const port = 8080;
const corsOptions = {
  origin: [
    "http://localhost:3000",
  ],
  credentials: true,
  exposedHeaders: ["set-cookie"],
};

app.use(cors(corsOptions));

app.use(express.static("public"));
app.use(express.json());
app.use(ItemsController);
app.use(AuthController);
app.use("/user", UserController);

app.get("/categories", async (req, res) => {
  const result = await AppDataSource.getRepository(Category).find();
  res.json(result);
});

app.get("/saledata" , async (req, res) => {
  const result = await AppDataSource.getRepository(SaleSlider).find();
  res.json(result);
});

app.listen(port, () => {
  console.log(`Server started. Listening on port ${port}`);
});
