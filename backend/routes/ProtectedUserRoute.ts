import { Request, Response, Router } from "express";
import requireJwt from "../middlewares/requireJwt.ts"; // middleware to authenticate using JWT
import UserService from "../services/UserService.ts";
import { IUser } from "../database/models/User.ts";

const router = Router();

// mock user info endpoint to return user data
router.get("/", requireJwt, async (req: Request, res: Response) => {
  try {
    const user = req.user as IUser;
    console.log("User from JWT:", req.user);

    const veryVerySecretUserInfo = await UserService.getUser({
      userId: user.id,
    });

    res.status(200).json(veryVerySecretUserInfo);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while fetching user info", error });
  }
});

export default router;
