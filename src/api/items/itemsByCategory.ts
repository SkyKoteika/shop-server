import {AppDataSource} from "../../database";
import ShopItem from "../../models/ShopItem";

const getItemsByCategory = async (req, res) => {
    const categoryId = +req.params.categoryId as number | undefined;

    if (categoryId === undefined) {
        res.statusCode = 400;
        res.send({message: 'wtf'})
        return;
    }

    let builder =
        AppDataSource.getRepository(ShopItem).createQueryBuilder("item");

    builder = builder.innerJoin(
        "item.categories",
        "category",
        "category.id = :categoryId",
        {
            categoryId,
        }
    );

    if (req.query.maxPrice !== undefined)
        builder = builder
            .where('item.price <= :maxPrice', {maxPrice: req.query.maxPrice});

    if (req.query.minPrice !== undefined)
        builder = builder
            .where('item.price >= :minPrice', {minPrice: req.query.minPrice});

    const result = await builder.getMany();

    res.send(result);
};
export default getItemsByCategory;