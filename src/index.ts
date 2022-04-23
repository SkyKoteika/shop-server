import dotenv = require("dotenv");
dotenv.config();
console.info("dotenv configured")

import "reflect-metadata";
import express = require("express");
import { AppDataSource } from "./database";
import Category from "./models/Category";
import ItemsController from "./api/items";
import AuthController from "./api/auth";
import UserController from "./api/user";

const app = express();
const port = 8000;

app.use(express.static("public"));
app.use(express.json());
app.use(ItemsController);
app.use(AuthController);
app.use("/user", UserController);

app.get("/categories", async (req, res) => {
  const result = await AppDataSource.getRepository(Category).find();

  res.json(result);
});


app.listen(port, () => {
  console.log(`Server started. Listening on port ${port}`);
});
