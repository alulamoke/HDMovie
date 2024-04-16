import { z } from "zod";

const passwordRegExp =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
const passwordErrorMessage =
  "Password must be strong. At least one upper case alphabet. At least one lower case alphabet. At least one digit. At least one special character. Minimum eight in length.";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export const signupSchema = z.object({
  fullname: z.string().min(3, {
    message: "Full name must be at least 3 characters.",
  }),
  email: z.string().email(),
  password: z.string().regex(passwordRegExp, {
    message: passwordErrorMessage,
  }),
});

export const updateAccountSchema = z.object({
  fullname: z.string().min(3, {
    message: "Full name must be at least 3 characters.",
  }),
  email: z.string().email(),
});

export const updatePasswordSchema = z
  .object({
    currentPassword: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
    newPassword: z.string().regex(passwordRegExp, {
      message: passwordErrorMessage,
    }),
    confirmPassword: z.string(),
  })
  .superRefine(({ confirmPassword, newPassword }, ctx) => {
    if (confirmPassword !== newPassword) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match.",
        path: ["confirmPassword"],
      });
    }
  });
