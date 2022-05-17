import { AppDataSource } from "../../database";
import User from "../../models/User";
import hash from "../../core/hash";

export type SignUpPayload = {
    username: string;
    email: string;
    password: string;
  };
  
  
const signUp = (req, res) => {
    const payload: SignUpPayload = req.body;
    const repo = AppDataSource.getRepository(User);
    const user = new User();

    user.username = payload.username;
    user.email = payload.email;
    user.password = hash(payload.password);
    
    repo.save(user);
  
    res.status(201).send({
      status: 201,
      message: "user created",
    });
  }


  export default signUp;