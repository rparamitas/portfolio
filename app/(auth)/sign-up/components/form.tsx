"use client";

import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, SignUpType } from "@/schemas/signUp.schema";
import FormField from "@/components/common/form-field";

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpType>({
    resolver: zodResolver(signUpSchema),
  });

  const handleSubmitForm: SubmitHandler<SignUpType> = (data) => {
    console.log("Form submitted with data:", data);
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)} className="w-full">
      <FormField
        id="name"
        register={register}
        errors={errors}
        placeholder="Input your name"
      />

      <FormField
        id="email"
        register={register}
        errors={errors}
        placeholder="Input your email"
      />
      <FormField
        id="password"
        register={register}
        errors={errors}
        placeholder="Input your password"
      />
      <FormField
        id="confirmPassword"
        register={register}
        errors={errors}
        placeholder="Confirm your password"
      />
      <button type="submit">Sign In</button>
    </form>
  );
};

export default SignUpForm;
