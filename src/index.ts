import dotenv = require("dotenv");
dotenv.config();

import { Request, Response } from "express";
import "reflect-metadata";
import express = require("express");
import ShopItem from "./models/ShopItem";
import { createConnection } from "mysql";
import { AppDataSource } from "./database";
import Category from "./models/Category";
import User from "./models/User";
const jwt = require("jsonwebtoken");

const app = express();
const port = 8000;

app.use(express.static("public"));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  console.log("got a request!");

  res.send("hello world!");
});

const crypto = require("crypto");
const salt = "4t897y2er7b8f1342hg890df21";

process.env.TOKEN_SECRET;

console.log("my newest chang number 2");

const getHash = (str: string) => {
  const shasum = crypto.createHash("sha256");

  const pkg = {
    p: str,
    salt,
  };

  shasum.update(JSON.stringify(pkg));
  return shasum.digest("hex");
};

type SignUpPayload = {
  username: string;
  password: string;
};

app.post("/signup", (req, res) => {
  const payload: SignUpPayload = req.body;

  console.log(getHash(payload.password));
  console.log(payload);
  const repo = AppDataSource.getRepository(User);

  const user = new User();
  user.username = payload.username;
  user.password = getHash(payload.password);
  repo.save(user);

  res.send();
});

app.get("/categories", async (req, res) => {
  const result = await AppDataSource.getRepository(Category).find();

  res.json(result);
});

app.get("/items", async (req, res) => {
  const categoryId = +req.query.categoryId as number | undefined;

  const itemRepo = AppDataSource.getRepository(ShopItem);
  itemRepo
    .createQueryBuilder("item")
    .innerJoin("item.categories", "category", "category.id = :categoryId", {
      categoryId,
    })
    .getMany()
    .then((result) => res.json(result))
    .catch((error) => res.send(error));
});

app.get("/item", async (req, res) => {
  const itemId = +req.query.itemId as number | undefined;
  const itemRepo = AppDataSource.getRepository(ShopItem);
  itemRepo
    .createQueryBuilder()
    .select("item")
    .from(ShopItem, "item")
    .where("item.id = :itemId", { itemId })
    .getOne()
    .then((result) => res.json(result))
    .catch((error) => res.send(error));
});

app.listen(port, () => {
  console.log(`Server started. Listening on port ${port}`);
});
