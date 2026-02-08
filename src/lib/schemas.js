import { z } from 'zod';

// Regex for Egyptian phone numbers: Begins with 010, 011, 012, or 015 followed by 8 digits
const phoneRegex = /^01[0125][0-9]{8}$/;

export const registerSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    fullName: z.string().min(2, { message: "Full name is required" }).optional(),
    
    // Extended fields
    phone: z.string().regex(phoneRegex, { message: "Invalid Egyptian phone number" }).optional().or(z.literal('')),
    birthDate: z.string().optional(),
    age: z.union([z.string(), z.number()]).optional(),
    gender: z.enum(['male', 'female']).optional().or(z.literal('')),
    governorate: z.string().min(1, { message: "Governorate is required" }).optional().or(z.literal('')),
    
    socialMedia: z.object({
        facebook: z.literal('').or(z.string().url()).optional(),
        instagram: z.literal('').or(z.string().url()).optional(),
        youtube: z.literal('').or(z.string().url()).optional(),
        linkedin: z.literal('').or(z.string().url()).optional(),
    }).optional(),

    specialization: z.string().optional(),
    
    role: z.enum(['trainer', 'trainee']).optional().default('trainer'),
    
    termsAccepted: z.boolean().refine(val => val === true, {
        message: "You must accept the terms and conditions"
    }).optional(),
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
    profilePhoto: z.string().nullable().optional(),
    
    birthDate: z.string().optional(),
    age: z.union([z.string(), z.number()]).optional(),
    gender: z.enum(['male', 'female']).optional().or(z.literal('')),

    socialMedia: z.object({
        facebook: z.literal('').or(z.string().url()).optional(),
        instagram: z.literal('').or(z.string().url()).optional(),
        youtube: z.literal('').or(z.string().url()).optional(),
        linkedin: z.literal('').or(z.string().url()).optional(),
    }).optional(),

    alerts: z.array(z.object({
        message: z.string(),
        severity: z.enum(['info', 'warning', 'danger']),
        timestamp: z.string(),
    })).optional(),

    activityNotes: z.array(z.object({
        message: z.string(),
        timestamp: z.string(),
    })).optional(),
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
    content: z.string().optional(),
    imageUrl: z.string().url().optional().or(z.literal('')),
    images: z.array(z.string()).optional(),
    isPublished: z.boolean().optional(),
});

export const jobSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    company: z.string().min(1, "Company name is required"),
    location: z.string().min(1, "Location is required"),
    governorate: z.string().min(1, "Governorate is required"),
    type: z.enum(['full_time', 'part_time', 'contract']),
    salary: z.string().min(1, "Salary is required"),
    currency: z.enum(['EGP', 'USD', 'EUR', 'AED', 'SAR']).default('EGP'),
    description: z.string().min(10, "Description must be at least 10 characters"),
    logo: z.string().url().optional().or(z.literal('')),
    featured: z.boolean().optional().default(false),
    isPublished: z.boolean().optional().default(true),
});

export const messageSchema = z.object({
    coachId: z.string().min(1, "Coach ID is required"),
    message: z.string().min(1, "Message is required").max(2000, "Message cannot exceed 2000 characters"),
});
