import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { User } from "../user/user.model";

export class Post {
  @prop()
  public title: string;

  @prop({ required: true, ref: () => User })
  public author: Ref<User>;

  @prop({ required: true })
  public content: string;
}

export const PostModel = getModelForClass(Post, {
  schemaOptions: {
    timestamps: true,
  },
});
