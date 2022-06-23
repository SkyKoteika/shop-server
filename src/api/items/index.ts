import { Router } from "express";
import getItem from "./item";
import getItems from "./items";
import getItemsByCategory from "./itemsByCategory";


const router = Router();

// router.get("/items", getItemsByCategory);
// router.get("/CartItems", getCartItems)
// router.get("/items/:itemId", getItem);

router.get("/items", getItems);
router.get("/items/category/:categoryId", getItemsByCategory);
router.get("/items/:itemId", getItem);

export default router;
