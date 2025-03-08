import { z } from "zod";

export const firstNameMaxLength = 80 as const;
export const lastNameMaxLength = 80 as const;
export const passwordMinLength = 12 as const;
export const passwordMaxLength = 50 as const;

export const firstNameValidationSchema = z
  .string({ required_error: "Le prénom est requis" })
  .min(1, { message: "Le prénom ne peut pas être vide" })
  .max(firstNameMaxLength, {
    message: `Le prénom ne peut pas dépasser ${firstNameMaxLength} caractères`,
  })
  .trim();

export const emailValidationSchema = z
  .string({ required_error: "L'adresse e-mail est requise" })
  .email({ message: "L'adresse e-mail n'est pas valide" });

export const lastNameValidationSchema = z
  .string({ required_error: "Le nom de famille est requis" })
  .min(1, { message: "Le nom de famille ne peut pas être vide" })
  .max(lastNameMaxLength, {
    message: `Le nom de famille ne peut pas dépasser ${lastNameMaxLength} caractères`,
  })
  .trim();

export const passwordValidationSchema = z
  .string({ required_error: "Le mot de passe est requis" })
  .min(passwordMinLength, {
    message: `Le mot de passe doit contenir au moins ${passwordMinLength} caractères`,
  })
  .max(passwordMaxLength, {
    message: `Le mot de passe ne peut pas dépasser ${passwordMaxLength} caractères`,
  });

export const updateEmailValidationSchema = z
  .object({
    password: passwordValidationSchema.optional(),
    email: emailValidationSchema,
  })
  .refine(
    (data) => {
      if (data.password === undefined && data.email) return true;
      return data.password !== undefined;
    },
    {
      message: "Le mot de passe est requis pour modifier l'adresse e-mail",
      path: ["password"],
    }
  );

export const updatePasswordValidationSchema = z
  .object({
    password: passwordValidationSchema,
    newPassword: passwordValidationSchema,
  })
  .refine((data) => data.password !== data.newPassword, {
    message: "Le nouveau mot de passe doit être différent de l'ancien",
    path: ["newPassword"],
  });

export const updateFirstNameAndLastNameValidationSchema = z.object({
  firstName: firstNameValidationSchema,
  lastName: lastNameValidationSchema,
});
