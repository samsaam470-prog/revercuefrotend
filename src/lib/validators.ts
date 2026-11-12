import { z } from "zod";

export const emailSchema = z.string().min(1, "Enter your email.").email("Enter a valid email address.");

export const passwordSchema = z
  .string()
  .min(8, "Use at least 8 characters.")
  .max(200, "That password is too long.");

export const signupSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  tos_accepted: z.literal(true, {
    errorMap: () => ({ message: "You must accept the Terms and Privacy Policy." }),
  }),
  newsletter_opt_in: z.boolean(),
});

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Enter your password."),
});

export const urlSchema = z
  .string()
  .min(1, "Enter a URL.")
  .refine((value) => /^https?:\/\/.+\..+/.test(value), "Enter a full URL (https://…).");

export const requiredText = (min = 1, message = "This field is required.") =>
  z.string().trim().min(min, message);

export function passwordStrength(password: string): number {
  if (!password) return 0;
  let score = 0;
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  return Math.min(score, 5);
}

export const strengthLabel = (score: number): string => {
  if (score <= 1) return "Weak";
  if (score <= 2) return "Fair";
  if (score <= 3) return "Good";
  if (score <= 4) return "Strong";
  return "Excellent";
};
