"use client"
import { resetPasswordValidation } from '@/validation/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import z from 'zod';



type TInputs = z.infer<typeof resetPasswordValidation>

const ResetPassword = () => {
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<TInputs>({
    resolver: zodResolver(resetPasswordValidation)
  })

  const onSubmit: SubmitHandler<TInputs> = (data) => {
    console.log(data)
  }

  return (
    <div className="w-full md:w-1/2 flex flex-col items-center justify-center gap-8">
      <div className="text-center">
        <h2 className='text-main font-semibold text-subheading'>QuizAI</h2>
        <h1 className="font-semibold text-heading text-main">Reset Password</h1>
        <p className="text-paragraph text-title">Enter your new password</p>
      </div>

      <form className="w-full md:w-1/2 space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {/* New Password Field */}
        <div>
          <label className="text-main font-semibold text-paragraph block mb-2" htmlFor="newPassword">
            New Password
          </label>
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              className="w-full appearance-none px-4 py-2 pr-12 border border-gray-700/70 rounded-lg focus:outline-2 outline-header text-title"
              placeholder="Enter your new password"
              {...register("newPassword")}
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-4 text-header hover:text-header/80"
              aria-label={showNewPassword ? "Hide password" : "Show password"}
            >
              {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.newPassword && <p className="text-red-500 text-sm mt-2">{errors.newPassword.message}</p>}
        </div>

        {/* Confirm New Password Field */}
        <div>
          <label className="text-main font-semibold text-paragraph block mb-2" htmlFor="confirmPassword">
            Confirm New Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="w-full appearance-none px-4 py-2 pr-12 border border-gray-700/70 rounded-lg focus:outline-2 outline-header text-title"
              placeholder="Confirm your new password"
              {...register("confirmPassword")}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-4 text-header hover:text-header/80"
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.confirmPassword && <p className="text-red-500 text-sm mt-2">{errors.confirmPassword.message}</p>}
        </div>

        <button
          type="submit"
          className="text-main font-semibold w-full text-center py-2 rounded-lg bg-header hover:bg-header/90"
        >
          Reset Password
        </button>
      </form>
    </div>
  )
}

export default ResetPassword