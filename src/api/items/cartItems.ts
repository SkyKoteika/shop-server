import { SelectQueryBuilder } from "typeorm";
import { AppDataSource } from "../../database";
import ShopItem from "../../models/ShopItem";

const getCartItems = async (req, res) => {
  const cart = req.query.cart as number[];

  if (cart === undefined) {
    res.status(400).send({ status: 400, message: "cart is not defined" });
    return;
  }

  let builder = AppDataSource.getRepository(ShopItem).createQueryBuilder();

  const result = await builder
    .select("item")
    .from(ShopItem, "item")
    .where("item.id IN (:cart)", { cart })
    .getMany();

  res.send(result);
};

export default getCartItems;
