import { Router } from "express";
import refreshToken from "./refreshToken";
import signIn from "./signIn";
import signUp from "./signUp";

const router = Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/refreshToken", refreshToken);

export default router;