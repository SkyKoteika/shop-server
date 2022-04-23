import hash from "../../core/hash";
import { AppDataSource } from "../../database";
import User from "../../models/User";
import { generateTokens } from "../../core/token";
import { expressjwt as jwt } from "express-jwt";

type SignInPayload = {
  username: string;
  password: string;
};

const signIn = (req, res) => {
  const payload: SignInPayload = req.body;
  const passwordHash = hash(payload.password);

  const repo = AppDataSource.getRepository(User);

  repo
    .findOne({
      where: { username: payload.username, password: passwordHash },
    })
    .then((result) => {
      if (result) {
        res.send(generateTokens(payload.username));
      } else {
        res.status(401).send({ status: 401, message: "not logged in" });
      }
    })
    .catch((error) => res.status(502).send(error));
};

export default signIn;
