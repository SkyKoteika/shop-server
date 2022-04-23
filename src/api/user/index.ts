import { Router } from "express";
import * as jwt from "jsonwebtoken";
import { send } from "process";
import { AppDataSource } from "../../database";
import User from "../../models/User";

const router = Router();

router.get("/profile", (req, res) => {
  console.log(req.headers);
  const authorizationHeader = req.headers["authorization"];
  const token = authorizationHeader.split(" ")[1];

  jwt.verify(
    token,
    process.env.TOKEN_SECRET as string,
    async (err: any, tokenPayload: any) => {
        if(err) {
            res.status(401).send("not logged in");
        }  else {
            const repo = AppDataSource.getRepository(User);
            const user = await repo.findOne({where: {username: tokenPayload.username}});

            res.send(user);
        }
    }
  );
});
export default router;
