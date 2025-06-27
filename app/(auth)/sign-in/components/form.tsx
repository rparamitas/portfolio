"use client";

import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, SignInType } from "@/schemas/signIn.schema";
import FormField from "@/components/common/form-field";

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInType>({
    resolver: zodResolver(signInSchema),
  });

  const handleSubmitForm: SubmitHandler<SignInType> = (data) => {
    console.log("Form submitted with data:", data);
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)} className="w-full">
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
      <button type="submit">Sign In</button>
    </form>
  );
};

export default SignInForm;
