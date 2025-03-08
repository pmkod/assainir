import { z } from "zod";

export const firstAndLastNameMaxLength = 120 as const;
export const lastNameMaxLength = 80 as const;
export const passwordMinLength = 4 as const;
export const passwordMaxLength = 50 as const;

export const firstNameAndLastNameValidationSchema = z
  .string({ required_error: "Les noms & prénoms et sont requis" })
  .min(1, { message: "Remplissez ce champ" })
  .max(firstAndLastNameMaxLength, {
    message: `Au maximum ${firstAndLastNameMaxLength} caractères`,
  })
  .trim();

export const emailValidationSchema = z
  .string({ required_error: "L'adresse e-mail est requise" })
  .email({ message: "L'adresse e-mail n'est pas valide" });

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
