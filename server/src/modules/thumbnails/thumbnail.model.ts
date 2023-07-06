import { Ref, getModelForClass, prop } from "@typegoose/typegoose";
import { User } from "../user/user.model";
import { v4 as uuidv4 } from 'uuid';


function generateUniqueId(length: number) {
  let id = uuidv4().replace(/-/g, '');
  while (id.length < length) {
    id += uuidv4().replace(/-/g, '');
  }
  return id.substring(0, length);
}

export enum ParentType {
  Video = "Video",
  Post = "Post",
  File = "File",
}

export class Thumbnail {
  @prop()
  public url: string;

  @prop({ required: true })
  public ownerId: string;

  @prop({ required: true })
  public parentId: string;

  @prop({ required: true, enum: ParentType })
  public parentType: ParentType;

  @prop({ enum: ["png", "jpeg"] })
  public extension: string;

  @prop({ unique: true, default: () => generateUniqueId(10) })
  public thumbnailId: string;
}

export const ThumbnailModel = getModelForClass(Thumbnail, {
  schemaOptions: {
    timestamps: true,
  },
});
