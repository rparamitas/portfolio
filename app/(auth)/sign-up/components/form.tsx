"use client";

import React, { useState, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, SignUpType } from "@/schemas/signUp.schema";
import FormField from "@/components/common/form-field";
import { SignUpAction } from "@/actions/auth/sign-up";

const SignUpForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpType>({
    resolver: zodResolver(signUpSchema),
  });

  const handleSubmitForm: SubmitHandler<SignUpType> = (data) => {
    // console.log("Form submitted with data:", data);
    setError("");
    setSuccess("");
    startTransition(() => {
      SignUpAction(data)
        .then((result) => {
          setError(result.error);
          setSuccess(result.message);
        })
        .catch((error) => {
          // console.error("Unexpected error during sign up:", error);
          setError(error);
        });
    });
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)} className="w-full">
      <FormField
        id="name"
        register={register}
        errors={errors}
        placeholder="Input your name"
        type="text"
        disabled={isPending}
      />
      <FormField
        id="email"
        register={register}
        errors={errors}
        placeholder="Input your email"
        type="email"
        disabled={isPending}
      />
      <FormField
        id="password"
        register={register}
        errors={errors}
        placeholder="Input your password"
        type="password"
        disabled={isPending}
      />
      <FormField
        id="confirmPassword"
        register={register}
        errors={errors}
        placeholder="Confirm your password"
        type="password"
        disabled={isPending}
      />
      <p>
        {error && <span className="text-red-500">{error}</span>}
        {success && <span className="text-green-500">{success}</span>}
      </p>
      <button type="submit" disabled={isPending}>
        {isPending ? "Submitting..." : "Sign Up"}
      </button>
    </form>
  );
};

export default SignUpForm;
