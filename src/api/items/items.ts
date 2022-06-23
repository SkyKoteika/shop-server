import { AppDataSource } from "../../database";
import ShopItem from "../../models/ShopItem";

const getItems = async (req, res) => {
  let builder = AppDataSource.getRepository(ShopItem).createQueryBuilder();
    const {page = 0, pageSize = 10} = req.query;

    builder = builder
        .select('item')
        .from(ShopItem, 'item')

    if (req.query.ids !== undefined)
    // console.log(req.query.ids)
        builder = builder
            // .where('item.id in (:ids)', {ids: (req.query.ids as string).split(',')})
            .where('item.id in (:ids)', {ids: req.query.ids as string})


    if (req.query.maxPrice !== undefined)
        builder = builder
            .where('item.price <= :maxPrice', {maxPrice: req.query.maxPrice});
    if (req.query.minPrice !== undefined)
        builder = builder
            .where('item.price >= :minPrice', {minPrice: req.query.minPrice});

    // const result = await paginated(builder, +page, +pageSize)
    const result = await builder.getMany();


    res.send(result);
  };
  export default getItems