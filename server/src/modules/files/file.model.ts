import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { User } from "../user/user.model";

export class File {
  @prop()
  public url: string;

  @prop({ required: true, ref: () => User })
  public owner: Ref<User>;

  @prop({ required: true })
  public filename: string;
}

export const FileModel = getModelForClass(File, {
  schemaOptions: {
    timestamps: true,
  },
});
