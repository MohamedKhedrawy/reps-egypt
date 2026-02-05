import { z } from 'zod';

// Regex for Egyptian phone numbers: Begins with 010, 011, 012, or 015 followed by 8 digits
const phoneRegex = /^01[0125][0-9]{8}$/;

export const registerSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    fullName: z.string().min(2, { message: "Full name is required" }).optional(), // Optional because we construct it if missing
    
    // Extended fields
    phone: z.string().regex(phoneRegex, { message: "Invalid Egyptian phone number" }).optional().or(z.literal('')),
    birthDate: z.string().optional(), // Could add date validation
    age: z.union([z.string(), z.number()]).optional(),
    
    socialMedia: z.object({
        facebook: z.string().url().optional().or(z.literal('')),
        instagram: z.string().url().optional().or(z.literal('')),
        youtube: z.string().url().optional().or(z.literal('')),
        linkedin: z.string().url().optional().or(z.literal('')),
    }).optional(),

    specialization: z.string().optional(),
    
    // Security: Allow 'trainer' or 'trainee' only. 
    // If 'admin' is passed, the API route should override or ignore it, 
    // but here we enforce struct validity.
    role: z.enum(['trainer', 'trainee']).optional().default('trainer'),
    
    termsAccepted: z.boolean().refine(val => val === true, {
        message: "You must accept the terms and conditions"
    }).optional(), // Optional in schema, enforced in API if needed
});

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, { message: "Password is required" }),
    rememberMe: z.boolean().optional(),
});

export const userUpdateSchema = z.object({
    fullName: z.string().min(2).optional(),
    phone: z.string().regex(phoneRegex).optional().or(z.literal('')),
    bio: z.string().optional(),
    location: z.string().optional(),
    specialization: z.string().optional(),
    
    birthDate: z.string().optional(),
    age: z.union([z.string(), z.number()]).optional(),

    socialMedia: z.object({
        facebook: z.string().url().optional().or(z.literal('')),
        instagram: z.string().url().optional().or(z.literal('')),
        youtube: z.string().url().optional().or(z.literal('')),
        linkedin: z.string().url().optional().or(z.literal('')),
    }).optional(),
});

export const passwordChangeSchema = z.object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "New password must be at least 8 characters"),
    confirmPassword: z.string().optional()
}).refine((data) => !data.confirmPassword || data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export const newsSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    category: z.string().min(1, "Category is required"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    imageUrl: z.string().url().optional().or(z.literal('')),
    isPublished: z.boolean().optional(),
});

export const messageSchema = z.object({
    coachId: z.string().min(1, "Coach ID is required"),
    message: z.string().min(1, "Message is required").max(2000, "Message cannot exceed 2000 characters"),
});
