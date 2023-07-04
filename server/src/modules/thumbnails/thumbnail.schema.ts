import { object, string, TypeOf } from "zod";

export const createThumbnailSchema = {
  body: object({
    videoId: string(),
    url: string(),
    ownerId: string()
  }),
};

export type CreateThumbnailBody = TypeOf<typeof createThumbnailSchema.body>;
