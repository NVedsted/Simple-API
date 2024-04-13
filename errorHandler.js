import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export function ZodErrorHandler(err, _, res, next) {
  if (err instanceof ZodError) {
    res.status(400).send(fromZodError(err).toString());
  } else {
    next(err);
  }
}
