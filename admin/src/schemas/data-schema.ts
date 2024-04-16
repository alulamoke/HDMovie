import { z } from "zod";

export const newGenreSchema = z.object({
  name: z.string().min(5, {
    message: "Name must be at least 3 characters.",
  }),
});
