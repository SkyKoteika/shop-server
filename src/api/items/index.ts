import { Router } from "express";
import getItem from "./item";
import getItems from "./items";

const router = Router();

router.get("/items", getItems);
router.get("/items/:itemId", getItem);

export default router;
