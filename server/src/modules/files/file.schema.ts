import { object, string, TypeOf } from "zod";

export const createFileSchema = {
  body: object({
    url: string(),
    ownerId: string(),
    filename: string(),
  }),
};

export type CreateFileBody = TypeOf<typeof createFileSchema.body>;
