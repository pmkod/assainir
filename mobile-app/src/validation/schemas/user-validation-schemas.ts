import { z } from "zod";

export const firstNameMaxLength = 80 as const;
export const lastNameMaxLength = 80 as const;
export const passwordMinLength = 12 as const;
export const passwordMaxLength = 50 as const;

export const firstNameValidationSchema = z
  .string()
  .min(1)
  .max(firstNameMaxLength)
  .trim();
export const phoneNumberValidationSchema = z.string().min(1).trim();
export const lastNameValidationSchema = z
  .string()
  .min(1)
  .max(lastNameMaxLength)
  .trim();
export const passwordValidationSchema = z
  .string()
  .min(passwordMinLength)
  .max(passwordMaxLength);

export const updatePhoneNumberValidationSchema = z.object({
  password: passwordValidationSchema.optional(),
  phoneNumber: phoneNumberValidationSchema,
});

export const updatePasswordValidationSchema = z.object({
  password: passwordValidationSchema,
  newPassword: passwordValidationSchema,
});

export const updateFirstNameAndLastNameValidationSchema = z.object({
  firstName: firstNameValidationSchema,
  lastName: lastNameValidationSchema,
});
