import { response } from "express";
import * as jwt from "jsonwebtoken";
import { AppDataSource } from "../../database";
import User from "../../models/User";

type AccessTokenPayload = {
  accessToken: any;
};

const checkUser = (req, res) => {
  const payload: any = req.headers.authorization.split(" ")[1];
  const repo = AppDataSource.getRepository(User);
  if (payload !== undefined)
    jwt.verify(
      payload,
      process.env.TOKEN_SECRET as string,
      async (err, decoded) => {
        repo
          .findOne({
            where: { username: decoded.username },
          })
          .then((response) =>
            res.send({
              ...response,
              password: undefined,
              email: undefined,
              isVeryfied: undefined,
            })
          );
      }
    );
};

export default checkUser;
