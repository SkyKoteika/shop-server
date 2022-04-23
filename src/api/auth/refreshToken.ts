import hash from "../../core/hash";
import { AppDataSource } from "../../database";
import User from "../../models/User";
import * as jwt from "jsonwebtoken";
import { SimpleConsoleLogger } from "typeorm";
import { generateTokens } from "../../core/token";

type RefreshTokenPayload = {
  refreshToken: string;
};

const refreshToken = (req, res) => {
  const payload: RefreshTokenPayload = req.body;
  const token = payload.refreshToken;
  const repo = AppDataSource.getRepository(User);

  jwt.verify(
    token,
    process.env.TOKEN_SECRET as string,
    async (err: any, tokenPayload: any) => {
        if(err) {
            res.status(401).send("not logged in");
        }  else {
            

            res.send(generateTokens(tokenPayload.username));
        }
    }
  );
};

export default refreshToken;
