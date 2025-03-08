import { z } from "zod";
import {
  firstNameValidationSchema,
  lastNameValidationSchema,
  passwordValidationSchema,
  phoneNumberValidationSchema,
} from "./user-validation-schemas";
import { idValidationSchema } from "./shared-schemas";

export const loginFormValidationSchema = z.object({
  phoneNumber: phoneNumberValidationSchema,
  password: passwordValidationSchema,
  countryId: idValidationSchema,
});

export const otpValidationSchema = z.string().min(1).max(50);

export const userVerificationFormValidationSchema = z.object({
  otp: otpValidationSchema,
});

export const passwordResetValidationSchema = z.object({
  phoneNumber: phoneNumberValidationSchema,
  countryId: idValidationSchema,
});

export const signupFormValidationSchema = z.object({
  firstName: firstNameValidationSchema,
  lastName: lastNameValidationSchema,
  phoneNumber: phoneNumberValidationSchema,
  password: passwordValidationSchema,
  countryId: idValidationSchema,
});

export const newPasswordFormValidationSchema = z.object({
  newPassword: passwordValidationSchema,
  newPasswordConfirmation: z.string().min(1),
});
