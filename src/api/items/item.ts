import { AppDataSource } from "../../database";
import ShopItem from "../../models/ShopItem";

const getItem = async (req, res) => {
    // const itemId = +req.params.itemId as number | undefined;
  
    // if (Number.isNaN(itemId)) {
    //   res.status(400).send({ status: 400, message: "id is not a number!" });
    //   return;
    // }
  
    // const itemRepo = AppDataSource.getRepository(ShopItem);
    // itemRepo
    //   .createQueryBuilder()
    //   .select("item")
    //   .from(ShopItem, "item")
    //   .where("item.id = :itemId", { itemId })
    //   .getOne()
    //   .then((result) => {
    //     if (result === null) {
    //       res
    //         .status(404)
    //         .send({ status: 404, message: "this item doesn't exist" });
    //       return;
    //     }
    //     res.json(result);
    //   })
    //   .catch((error) => res.send(error));


    const itemId = +req.params.itemId as number | undefined;
  
    if (Number.isNaN(itemId)) {
      res.status(400).send({ status: 400, message: "id is not a number!" });
      return;
    }
  
    const itemRepo = AppDataSource.getRepository(ShopItem);
    itemRepo
      .createQueryBuilder()
      .select("item")
      .from(ShopItem, "item")
      .where("item.id = :itemId", { itemId })
      .getOne()
      .then((result) => {
        if (result === null) {
          res
            .status(404)
            .send({ status: 404, message: "this item doesn't exist" });
          return;
        }
        res.json(result);
      })
      .catch((error) => res.send(error));

  };
  export default getItem;