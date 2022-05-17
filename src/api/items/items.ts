import { AppDataSource } from "../../database";
import ShopItem from "../../models/ShopItem";

const getItems = async (req, res) => {
    const categoryId = req.query.categoryId as number | undefined;
  
    let builder =
      AppDataSource.getRepository(ShopItem).createQueryBuilder("item");
  
    if (categoryId !== undefined)
      builder = builder.innerJoin(
        "item.categories",
        "category",
        "category.id = :categoryId",
        {
          categoryId: categoryId,
        }
      );
  
    builder
      .getMany()
      .then((result) => res.json(result))
      .catch((error) => res.send(error));
  };
  export default getItems