import { z } from "zod";
import {
  firstNameValidationSchema,
  lastNameValidationSchema,
  passwordValidationSchema,
  emailValidationSchema,
} from "./user-validation-schemas";
import { idValidationSchema } from "./shared-schemas";

export const loginFormValidationSchema = z.object({
  email: emailValidationSchema,
  password: passwordValidationSchema,
});

export const otpValidationSchema = z.string().min(1).max(50);

export const userVerificationFormValidationSchema = z.object({
  otp: otpValidationSchema,
});

export const passwordResetValidationSchema = z.object({
  email: emailValidationSchema,
  countryId: idValidationSchema,
});

export const signupFormValidationSchema = z.object({
  firstName: firstNameValidationSchema,
  lastName: lastNameValidationSchema,
  email: emailValidationSchema,
  password: passwordValidationSchema,
  countryId: idValidationSchema,
});

export const newPasswordFormValidationSchema = z.object({
  newPassword: passwordValidationSchema,
  newPasswordConfirmation: z.string().min(1),
});
