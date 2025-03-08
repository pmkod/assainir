import { z } from "zod";

export const idValidationSchema = z.coerce.number().positive();
