import { CreateFileBody } from "./file.schema";
import { FileModel } from "./file.model";
import { UserModel } from "../user/user.model";

export async function createFile({ url, ownerId, filename }: CreateFileBody) {
  const user = await UserModel.findById(ownerId);

  if (!user) {
    throw new Error("User not found");
  }

  const file = new FileModel({ url, owner: user._id, filename });
  return file.save();
}
export async function findAllFiles() {
    return FileModel.find().exec();
  }
  