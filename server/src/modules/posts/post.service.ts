import { CreatePostBody } from "./post.schema";
import { PostModel } from "./post.model";
import { UserModel } from "../user/user.model";

export async function createPost({ title, authorId, content }: CreatePostBody) {
  const user = await UserModel.findById(authorId);

  if (!user) {
    throw new Error("User not found");
  }

  const post = new PostModel({ title, author: user._id, content });
  return post.save();
}
export async function findAllPosts() {
    return PostModel.find().exec();
  }
  