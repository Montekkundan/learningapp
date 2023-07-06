import { CreateThumbnailBody } from "./thumbnail.schema";
import { ThumbnailModel } from "./thumbnail.model";
import { VideoModel } from "../videos/video.model";
import { UserModel } from "../user/user.model";
import logger from "../../utils/logger";
import { PostModel } from "../posts/post.model";
import { FileModel } from "../files/file.model";

export async function createThumbnail({ parentId, parentType, url, ownerId }: CreateThumbnailBody) {
  const user = await UserModel.findById(ownerId);
  let parent;

  switch(parentType) {
    case 'Video':
      parent = await VideoModel.findOne({ videoId: parentId });

      break;
    case 'BlogPost':
      parent = await PostModel.findById(parentId);
      break;
    case 'File':
      parent = await FileModel.findById(parentId);
      break;
    default:
      throw new Error("Invalid parentType provided");
  }

  if (!user || !parent) {
    throw new Error("User or parent not found");
  }

  const thumbnail = new ThumbnailModel({ parentId, parentType, ownerId: user._id, url });
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

