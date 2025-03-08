import { z } from "zod";
import {
  firstNameAndLastNameValidationSchema,
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

const companyNameMaxLength = 70;
const managerNameMaxLength = 70;

export const signupFormValidationSchema = z.object({
  firstNameAndLastName: firstNameAndLastNameValidationSchema.optional(),
  companyName: z
    .string()
    .min(companyNameMaxLength, "Remplissez ce champs")
    .max(companyNameMaxLength, `Au maximum ${companyNameMaxLength}`)
    .optional(),
  phoneNumber: z.string().length(10, "10 caractères pour le numero"),
  managerName: z
    .string()
    .min(1, "Remplissez ce champs")
    .max(managerNameMaxLength, `Au maximum ${managerNameMaxLength}`)
    .optional(),
  area: z.string().min(1, "Sélectionnez").optional(),
  email: emailValidationSchema,
  password: passwordValidationSchema,
  confirmPassword: passwordValidationSchema,
});

export const newPasswordFormValidationSchema = z.object({
  newPassword: passwordValidationSchema,
  newPasswordConfirmation: z.string().min(1),
});
