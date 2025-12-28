"use client";
import { forgotPasswordValidation } from "@/validation/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";

type TInputs = z.infer<typeof forgotPasswordValidation>

const ForgotPassword = () => {

  const { register, handleSubmit, formState: { errors }, } = useForm<TInputs>({
    resolver: zodResolver(forgotPasswordValidation)
  })
  const onSubmit: SubmitHandler<TInputs> = (data) => {
    console.log(data);
  }
  return (
    <div className="md:w-1/2 w-full space-y-8">
      <div className="text-center">
        <h2 className='text-main font-semibold text-subheading'>QuizAI</h2>
        <h1 className="font-semibold text-[40px] text-main">Forgot your password</h1>
        <p className="text-paragraph text-title">{`Enter your email and we'll send you a 6 digit code`}</p>
      </div>
      <form className="w-full md:w-1/2 space-y-4 mx-auto" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="text-main font-semibold text-paragraph block mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="w-full appearance-none px-4 py-2 border border-gray-700/70 rounded-lg focus:outline-2 outline-header text-title"
            placeholder="info@gmail.com"
            {...register("email")}
          />
          {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>}
        </div>
        <button
          type="submit"
          className="text-main font-semibold w-full text-center py-2 rounded-lg bg-header hover:bg-header/90"
        >
          Sent OTP
        </button>
      </form>
    </div>
  )
}

export default ForgotPassword