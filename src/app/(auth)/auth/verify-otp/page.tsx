/* eslint-disable react-hooks/incompatible-library */
"use client";
import { useForm, Controller } from "react-hook-form";
import { useRef } from "react";

interface OtpFormData {
    otp1: string;
    otp2: string;
    otp3: string;
    otp4: string;
    otp5: string;
    otp6: string;
}

const VerifyOtp = () => {
    const { control, handleSubmit, watch, setValue, formState: { errors } } = useForm<OtpFormData>({
        defaultValues: {
            otp1: "",
            otp2: "",
            otp3: "",
            otp4: "",
            otp5: "",
            otp6: "",
        },
    });

    // সঠিক টাইপ দিয়ে ref array
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleInputChange = (
        index: number,
        value: string,
        onChange: (value: string) => void
    ) => {
        if (value && !/^\d$/.test(value)) return;

        onChange(value);

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        index: number
    ) => {
        if (e.key === "Backspace" && !watch(`otp${index + 1}` as keyof OtpFormData)) {
            if (index > 0) {
                inputRefs.current[index - 1]?.focus();
            }
        }

        if (e.key === "ArrowLeft" && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
        if (e.key === "ArrowRight" && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").slice(0, 6);
        const digits = pastedData.match(/\d/g);

        if (digits) {
            digits.forEach((digit, index) => {
                if (index < 6) {
                    setValue(`otp${index + 1}` as keyof OtpFormData, digit);
                }
            });
            const lastIndex = Math.min(digits.length - 1, 5);
            inputRefs.current[lastIndex]?.focus();
        }
    };

    const onSubmit = async (data: OtpFormData) => {
        const otp = `${data.otp1}${data.otp2}${data.otp3}${data.otp4}${data.otp5}${data.otp6}`;
        console.log("OTP Submitted:", otp);
    };

    const handleResend = () => {
        console.log("Resend OTP");
    };

    const hasErrors = Object.keys(errors).length > 0;

    return (
        <div className="md:w-1/2 w-full space-y-8">
            <div className="space-y-8">
                <div>
                    <h2 className='text-main font-semibold text-subheading text-center'>QuizAI</h2>
                    <h1 className="text-heading font-bold text-main text-center">
                        Verify Your Email
                    </h1>
                    <p className="text-title text-small text-center">
                        {`We've sent a 6-digit code to your email`}
                        <br />
                        <span className="text-header">example@email.com</span>
                    </p>
                </div>

                <form className="w-full md:w-1/2 space-y-4 mx-auto" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex justify-center gap-3 mb-6">
                        {[1, 2, 3, 4, 5, 6].map((num, index) => (
                            <Controller
                                key={num}
                                name={`otp${num}` as keyof OtpFormData}
                                control={control}
                                rules={{
                                    required: "Required",
                                    pattern: {
                                        value: /^\d$/,
                                        message: "Only numbers",
                                    },
                                }}
                                render={({ field: { onChange, value } }) => (
                                    <input
                                        // এখানে ফিক্স করা হয়েছে
                                        ref={(el) => {
                                            inputRefs.current[index] = el;
                                        }}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={1}
                                        value={value}
                                        onChange={(e) =>
                                            handleInputChange(index, e.target.value, onChange)
                                        }
                                        onKeyDown={(e) => handleKeyDown(e, index)}
                                        onPaste={handlePaste}
                                        className={`w-12 h-12 md:w-14 md:h-14 text-center text-heading font-bold bg-card border rounded-lg focus:outline-none transition-all ${
                                            value
                                                ? "border-header text-white"
                                                : hasErrors
                                                    ? "border-gray-500"
                                                    : "border-gray-700/50 text-title"
                                        } focus:border-header`}
                                    />
                                )}
                            />
                        ))}
                    </div>

                    {hasErrors && (
                        <p className="text-red-500 text-sm text-center mb-4">
                            Please enter all 6 digits
                        </p>
                    )}

                    <button
                        type="submit"
                        className="text-main font-semibold w-full text-center py-2 rounded-lg bg-header hover:bg-header/90"
                    >
                        Verify OTP
                    </button>
                </form>

                <div className="text-center">
                    <p className="text-title text-small">
                        {` Didn't receive the code? `}
                        <button
                            onClick={handleResend}
                            className="text-header hover:underline font-medium"
                        >
                            Resend OTP
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default VerifyOtp;