import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { User } from "../user/user.model";
import { Video } from "../videos/video.model";

export class Thumbnail {
  @prop()
  public url: string;

  @prop({ required: true, ref: () => User })
  public owner: Ref<User>;

  @prop({ required: true, ref: () => Video })
  public video: Ref<Video>;
}

export const ThumbnailModel = getModelForClass(Thumbnail, {
  schemaOptions: {
    timestamps: true,
  },
});
