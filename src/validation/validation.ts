import { z } from "zod";

export const signInValidation = z.object({
    email: z.string().min(1, { message: "Email is required" }).email({ message: "Please enter a valid email address" }),
    password: z.string().min(1, { message: "Password is required" })
});

export const forgotPasswordValidation = z.object({
    email: z
        .string()
        .min(1, { message: "Email is required" })
        .email({ message: "Please enter a valid email address" })
})

export const resetPasswordValidation = z.object({
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters")
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});


export const quizValidation = z.object({
  topic: z.string().min(1, "Quiz topic is required"),
  context: z.string().optional(),
  numberOfQuestions: z.number().min(1, "At least 1 question is required").max(50, "Maximum 50 questions allowed")
});


export const personalInfoValidation = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  institute: z.string().min(1, "Institute name is required").optional()
});


export const changePasswordValidation = z.object({
    currentPassword: z.string().min(6, "Current password must be at least 6 characters"),
    newPassword: z.string().min(6, "New password must be at least 6 characters"),
    confirmNewPassword: z.string().min(6, "Confirm password must be at least 6 characters")
}).refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords don't match",
    path: ["confirmNewPassword"]
});