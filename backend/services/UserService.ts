import User, { IUser } from "../database/models/User";

interface GetUserParams {
  userId: string;
}

const getUser = async ({ userId }: GetUserParams): Promise<IUser | null> => {
  try {
    return await User.findById(userId).exec();
  } catch (error) {
    console.error(`Error fetching user with ID ${userId}:`, error);
    throw new Error("Failed to fetch user information");
  }
};

const UserService = {
  getUser,
};

export default UserService;
