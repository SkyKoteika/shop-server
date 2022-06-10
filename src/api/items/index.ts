import { Router } from "express";
import getCartItems from "./cartItems";
import getItem from "./item";
import getItems from "./items";

const router = Router();

router.get("/items", getItems);
router.get("/items/:itemId", getItem);
router.get("/CartItems", getCartItems)


export default router;
