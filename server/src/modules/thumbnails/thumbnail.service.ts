import { CreateThumbnailBody } from "./thumbnail.schema";
import { ThumbnailModel } from "./thumbnail.model";
import { VideoModel } from "../videos/video.model";
import { UserModel } from "../user/user.model";
import logger from "../../utils/logger";

export async function createThumbnail({ videoId, url, ownerId }: CreateThumbnailBody) {
  const user = await UserModel.findById(ownerId);
  const video = await VideoModel.findOne({ videoId });

  if (!user || !video) {
    throw new Error("User or Video not found");
  }

  const thumbnail = new ThumbnailModel({ video: video._id, owner: user._id, url });
  return thumbnail.save();
}
export async function findThumbnail(videoId: string) {
  logger.info(`Looking for video with ID: ${videoId}`);
  const video = await VideoModel.findOne({ _id: videoId });
  
  if (!video) {
    logger.error(`No video found with ID: ${videoId}`);
    throw new Error("Video not found");
  } else {
    logger.info(`Found video with ID: ${videoId}`);
  }
  
  logger.info(`Looking for thumbnail associated with video ID: ${video._id}`);
  return ThumbnailModel.findOne({ video: video._id }).exec();
}

export async function findAllThumbnails() {
  return ThumbnailModel.find().exec();
}

export async function deleteThumbnail(thumbnailId: string) {
  const thumbnail = await ThumbnailModel.findById(thumbnailId);

  if (!thumbnail) {
    throw new Error("Thumbnail not found");
  }

  await ThumbnailModel.deleteOne({ _id: thumbnailId });

  return thumbnail;
}

