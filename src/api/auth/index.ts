import { Router } from "express";
import checkUser from "./checkUser";
import refreshToken from "./refreshToken";
import signIn from "./signIn";
import signUp from "./signUp";

const router = Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/refreshToken", refreshToken);
router.post("/checkUser", checkUser);

export default router;