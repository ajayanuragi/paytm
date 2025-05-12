import { z } from "zod";

const signupSchema = z.object({
  username: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string(),
});
const signinSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const signupValidation = (req, res, next) => {
  const result = signupSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: result.error.flatten().fieldErrors,
    });
  }
  next();
};
export const signinValidation = (req, res, next) => {
  const result = signinSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: result.error.flatten().fieldErrors,
    });
  }
  next();
};
