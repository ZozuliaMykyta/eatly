"use client";
import React, { useState } from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { ISignUp } from "@/interfaces/IAuth";

interface IAuthInputs {
  hasName: boolean;
  message: string;
  register: UseFormRegister<ISignUp>;
  errors: FieldErrors<ISignUp>;
}

const AuthInputs = ({ hasName, message, register, errors }: IAuthInputs) => {
  const [visiblePassword, setVisiblePassword] = useState<boolean>(false);
  return (
    <>
      {hasName ? (
        <div>
          <div className="relative group">
            <input
              type="text"
              className="auth-input"
              placeholder="FULL NAME"
              {...register(
                "fullName",
                hasName
                  ? {
                      required: "Name is required",
                      minLength: {
                        value: 3,
                        message: "Full name must be at least 3 characters",
                      },
                    }
                  : undefined
              )}
            />
            <svg
              className="absolute top-[50%] left-6 translate-y-[-50%]"
              width="20.567383"
              height="22.530273"
              viewBox="0 0 20.5674 22.5303"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="group-focus-within:fill-purple transition-all duration-300"
                id="Icon"
                d="M10.28 0C7.16 0 4.64 2.52 4.64 5.63C4.64 8.75 7.16 11.27 10.28 11.27C13.39 11.27 15.92 8.75 15.92 5.63C15.92 2.52 13.39 0 10.28 0ZM6.63 5.63C6.63 3.62 8.26 1.99 10.28 1.99C12.29 1.99 13.93 3.62 13.93 5.63C13.93 7.65 12.29 9.28 10.28 9.28C8.26 9.28 6.63 7.65 6.63 5.63ZM4.97 13.26C2.22 13.26 0 15.49 0 18.24L0 19.82C0 20.82 0.72 21.67 1.71 21.83C7.38 22.76 13.17 22.76 18.85 21.83C19.84 21.67 20.56 20.82 20.56 19.82L20.56 18.24C20.56 15.49 18.33 13.26 15.59 13.26L15.13 13.26C14.89 13.26 14.65 13.3 14.41 13.38L13.27 13.75C11.32 14.39 9.23 14.39 7.29 13.75L6.14 13.38C5.91 13.3 5.67 13.26 5.42 13.26L4.97 13.26ZM1.99 18.24C1.99 16.59 3.32 15.25 4.97 15.25L5.42 15.25C5.46 15.25 5.49 15.26 5.53 15.27L6.67 15.65C9.02 16.41 11.54 16.41 13.88 15.65L15.03 15.27C15.06 15.26 15.1 15.25 15.13 15.25L15.59 15.25C17.24 15.25 18.57 16.59 18.57 18.24L18.57 19.82C18.57 19.84 18.55 19.86 18.53 19.87C13.07 20.76 7.49 20.76 2.03 19.87C2 19.86 1.99 19.84 1.99 19.82L1.99 18.24Z"
                fill="#C2C3CB"
                fillOpacity="1.000000"
                fillRule="evenodd"
              />
            </svg>
          </div>
          {hasName && errors.fullName && (
            <span className="inline-block text-red-600 text-sm mt-2">
              {errors.fullName.message}
            </span>
          )}
        </div>
      ) : (
        ""
      )}
      <div>
        <div className="relative group">
          <input
            type="email"
            className="auth-input"
            placeholder="EMAIL"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
          />
          <svg
            className="absolute top-[50%] left-6 translate-y-[-50%]"
            width="22.577148"
            height="17.332031"
            viewBox="0 0 22.5771 17.332"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="group-focus-within:fill-purple transition-all duration-300"
              id="Icon"
              d="M0.23 4.47C-0.11 7.46 -0.1 10.91 0.37 13.89C0.63 15.53 2.04 16.8 3.78 16.94L5.59 17.09C9.38 17.41 13.19 17.41 16.97 17.09L18.79 16.94C20.53 16.8 21.93 15.53 22.19 13.89C22.66 10.91 22.68 7.46 22.34 4.47C22.3 4.13 22.25 3.78 22.19 3.44C21.93 1.79 20.53 0.53 18.79 0.38L16.97 0.23C13.19 -0.08 9.38 -0.08 5.59 0.23L3.78 0.38C2.04 0.53 0.63 1.79 0.37 3.44C0.32 3.78 0.27 4.13 0.23 4.47ZM5.75 1.95C9.43 1.64 13.14 1.64 16.82 1.95L18.63 2.1C19.54 2.17 20.27 2.83 20.41 3.69C20.42 3.78 20.44 3.87 20.45 3.96L13.77 7.51C12.22 8.33 10.35 8.33 8.8 7.51L2.12 3.96C2.13 3.87 2.14 3.78 2.16 3.69C2.29 2.83 3.03 2.17 3.93 2.1L5.75 1.95ZM20.67 5.81C20.91 8.42 20.82 11.04 20.41 13.63C20.27 14.49 19.54 15.15 18.63 15.22L16.82 15.38C13.14 15.68 9.43 15.68 5.75 15.38L3.93 15.22C3.03 15.15 2.29 14.49 2.16 13.63C1.75 11.04 1.66 8.42 1.9 5.81L7.93 9.01C10.01 10.12 12.55 10.12 14.64 9.01L20.67 5.81Z"
              fill="#C2C3CB"
              fillOpacity="1.000000"
              fillRule="evenodd"
            />
          </svg>
        </div>
        {message && (
          <span className="inline-block text-red-600 text-sm mt-2">
            {message}
          </span>
        )}
        {errors.email && (
          <span className="inline-block text-red-600 text-sm mt-2">
            {errors.email.message}
          </span>
        )}
      </div>
      <div>
        <div className="relative">
          <div className="group">
            <input
              type={visiblePassword ? "text" : "password"}
              className="auth-input !pr-[60px]"
              placeholder="PASSWORD"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                validate: {
                  hasUpperCase: (value) =>
                    /[A-Z]/.test(value) ||
                    "Must contain at least one uppercase letter",
                  hasLowerCase: (value) =>
                    /[a-z]/.test(value) ||
                    "Must contain at least one lowercase letter",
                  hasNumber: (value) =>
                    /\d/.test(value) || "Must contain at least one number",
                  hasSpecialChar: (value) =>
                    /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
                    "Must contain at least one special character",
                },
              })}
            />
            <svg
              className="absolute top-[50%] left-6 translate-y-[-50%]"
              width="18.356445"
              height="23.715820"
              viewBox="0 0 18.3564 23.7158"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="group-focus-within:fill-purple transition-all duration-300"
                id="Icon"
                d="M3.41 6.72L3.8 10.2L2.96 10.27C1.63 10.37 0.55 11.37 0.33 12.69C-0.12 15.43 -0.12 18.23 0.33 20.97C0.55 22.29 1.63 23.28 2.96 23.39L4.8 23.54C7.71 23.77 10.64 23.77 13.55 23.54L15.39 23.39C16.72 23.28 17.8 22.29 18.02 20.97C18.46 18.23 18.46 15.43 18.02 12.69C17.8 11.37 16.72 10.37 15.39 10.27L14.54 10.2L14.93 6.72C14.98 6.27 14.98 5.82 14.93 5.37L14.9 5.12C14.61 2.46 12.51 0.35 9.85 0.03C9.4 -0.02 8.95 -0.02 8.5 0.03C5.84 0.35 3.74 2.46 3.44 5.12L3.41 5.37C3.37 5.82 3.37 6.27 3.41 6.72ZM9.63 1.86C9.33 1.83 9.02 1.83 8.71 1.86C6.9 2.08 5.47 3.51 5.27 5.33L5.24 5.58C5.21 5.89 5.21 6.2 5.24 6.52L5.64 10.06C7.99 9.91 10.35 9.91 12.71 10.06L13.1 6.52C13.14 6.2 13.14 5.89 13.1 5.58L13.07 5.33C12.87 3.51 11.45 2.08 9.63 1.86ZM4.94 11.96C7.76 11.73 10.59 11.73 13.41 11.96L15.24 12.1C15.73 12.14 16.12 12.51 16.2 12.99C16.62 15.53 16.62 18.13 16.2 20.67C16.12 21.15 15.73 21.52 15.24 21.56L13.41 21.7C10.59 21.93 7.76 21.93 4.94 21.7L3.11 21.56C2.62 21.52 2.23 21.15 2.15 20.67C1.73 18.13 1.73 15.53 2.15 12.99C2.23 12.51 2.62 12.14 3.11 12.1L4.94 11.96ZM9.17 14.99C8.16 14.99 7.33 15.81 7.33 16.83C7.33 17.85 8.16 18.67 9.17 18.67C10.19 18.67 11.01 17.85 11.01 16.83C11.01 15.81 10.19 14.99 9.17 14.99Z"
                fill="#C2C3CB"
                fillOpacity="1.000000"
                fillRule="evenodd"
              />
            </svg>
          </div>
          <button
            type="button"
            onClick={() => setVisiblePassword(!visiblePassword)}
            className="absolute top-[50%] right-7 translate-y-[-50%] group cursor-pointer"
            aria-label="Toggle password visibility"
          >
            <svg
              onClick={() => setVisiblePassword(!visiblePassword)}
              width="21.679199"
              height="19.456055"
              viewBox="0 0 21.6792 19.4561"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="group-focus-within:fill-purple transition-all duration-300 group-active:fill-purple group-hover:fill-purple"
                id="Icon"
                d="M20.32 1.42C20.64 1.09 20.64 0.57 20.32 0.24C19.99 -0.09 19.46 -0.09 19.14 0.24L1.35 18.03C1.03 18.35 1.03 18.88 1.35 19.21C1.68 19.53 2.2 19.53 2.53 19.21L5.7 16.04C7.21 16.76 8.96 17.23 10.83 17.23C13.82 17.23 16.49 16.03 18.42 14.55C19.38 13.81 20.18 12.99 20.74 12.18C21.29 11.39 21.67 10.53 21.67 9.72C21.67 8.92 21.29 8.05 20.74 7.27C20.18 6.46 19.38 5.63 18.42 4.89C18.13 4.67 17.82 4.45 17.49 4.24L20.32 1.42ZM10.83 2.22C11.98 2.22 13.08 2.4 14.12 2.7C14.31 2.76 14.37 3 14.23 3.15L13.31 4.07C13.24 4.14 13.14 4.16 13.05 4.14C12.34 3.98 11.6 3.89 10.83 3.89C8.29 3.89 5.96 4.91 4.27 6.21C3.42 6.87 2.75 7.57 2.3 8.22C1.83 8.89 1.66 9.41 1.66 9.72C1.66 10.03 1.83 10.56 2.3 11.23C2.69 11.79 3.25 12.4 3.95 12.98C4.08 13.09 4.1 13.28 3.98 13.4L3.19 14.19C3.09 14.29 2.93 14.3 2.82 14.21C2.05 13.56 1.41 12.86 0.93 12.18C0.38 11.39 0 10.53 0 9.72C0 8.92 0.38 8.05 0.93 7.27C1.49 6.46 2.29 5.63 3.25 4.89C5.18 3.42 7.85 2.22 10.83 2.22ZM16.28 5.45L14.31 7.42C14.75 8.08 15 8.87 15 9.72C15 12.03 13.14 13.89 10.83 13.89C9.98 13.89 9.19 13.64 8.54 13.2L6.96 14.78C8.14 15.26 9.46 15.56 10.83 15.56C13.38 15.56 15.7 14.53 17.4 13.23C18.25 12.58 18.92 11.88 19.37 11.23C19.83 10.56 20.01 10.03 20.01 9.72C20.01 9.41 19.83 8.89 19.37 8.22C18.92 7.57 18.25 6.87 17.4 6.21C17.05 5.95 16.68 5.69 16.28 5.45ZM11.23 5.57C11.1 5.56 10.97 5.55 10.83 5.55C8.53 5.55 6.67 7.42 6.67 9.72C6.67 9.85 6.67 9.99 6.68 10.11C6.7 10.33 6.97 10.41 7.12 10.26L8.47 8.91C8.72 8.18 9.29 7.61 10.02 7.36L11.37 6.01C11.52 5.85 11.44 5.59 11.23 5.57ZM9.76 11.98C10.08 12.14 10.45 12.22 10.83 12.22C12.22 12.22 13.34 11.1 13.34 9.72C13.34 9.34 13.25 8.97 13.09 8.64L9.76 11.98Z"
                fill="#C2C3CB"
                fillOpacity="1.000000"
                fillRule="evenodd"
              />
            </svg>
          </button>
        </div>
        {errors.password && (
          <p className="inline-block text-red-600 text-sm mt-2">
            {errors.password.message}
          </p>
        )}
      </div>
    </>
  );
};

export default AuthInputs;
