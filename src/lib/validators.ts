import { z } from 'zod';

export const emailSchema = z.string().email('Enter a valid email.');
export const passwordSchema = z.string().min(8, 'Password must be at least 8 characters.');
export const urlSchema = z.string().url('Enter a valid URL.');
export const otpSchema = z.string().length(6, 'Enter the 6-digit code.');
