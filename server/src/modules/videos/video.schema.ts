import { array, boolean, object, string, TypeOf } from "zod";

export const updateVideoSchema = {
  body: object({
    title: string(),
    description: string(),
    published: boolean(),
    tags: array(string()).nonempty("Tags array must not be empty"),
  }),
  params: object({
    videoId: string(),
  }),
};

export type UpdateVideoBody = TypeOf<typeof updateVideoSchema.body>;
export type UpdateVideoParams = TypeOf<typeof updateVideoSchema.params>;
