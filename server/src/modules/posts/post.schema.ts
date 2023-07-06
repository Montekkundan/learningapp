import { object, string, TypeOf } from "zod";

export const createPostSchema = {
  body: object({
    title: string(),
    authorId: string(),
    content: string(),
  }),
};

export type CreatePostBody = TypeOf<typeof createPostSchema.body>;
