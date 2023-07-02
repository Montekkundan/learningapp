import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { User } from "../user/user.model";
import { v4 as uuidv4 } from 'uuid';

function generateUniqueId(length: number) {
  let id = uuidv4().replace(/-/g, '');
  while (id.length < length) {
    id += uuidv4().replace(/-/g, '');
  }
  return id.substring(0, length);
}

export class Video {
  @prop()
  public title: string;

  @prop()
  public description: string;

  @prop({ enum: ["mp4"] })
  public extension: string;

  @prop({ required: true, ref: () => User })
  public owner: Ref<User>;

  @prop({ unique: true, default: () => generateUniqueId(10) })
  public videoId: string;

  @prop({ default: false })
  public published: boolean;
}

export const VideoModel = getModelForClass(Video, {
  schemaOptions: {
    timestamps: true,
  },
});
