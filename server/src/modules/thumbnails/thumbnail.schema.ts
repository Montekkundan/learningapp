import { object, string, TypeOf, union, literal } from "zod";

export const createThumbnailSchema = {
  body: object({
    parentId: string(),
    parentType: union([literal('Video'), literal('BlogPost'), literal('File')]), // The parentType must be one of these values
    url: string(),
    ownerId: string()
  }),
};

export type CreateThumbnailBody = TypeOf<typeof createThumbnailSchema.body>;
