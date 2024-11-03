import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const patientSchema = z.object({
  id: z.string(),
  name: z.string(),
  age: z.number(),
  sex: z.enum(["male", "female"]),
});

export type Patient = z.infer<typeof patientSchema>;
