"use client";

import { useState, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, SignUpType } from "@/schemas/signUp.schema";
import FormField from "@/components/common/form-field";
import Alert from "@/components/common/alert";

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

  const handleSubmitForm: SubmitHandler<SignUpType> = () => {
    setError("");
    setSuccess("");
    startTransition(() => {
      // TODO: wire up to a Convex mutation once the backend is set up.
      setError("Sign up is not available yet.");
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
      {error && <Alert error message={error} />}
      {success && <span className="text-green-500">{success}</span>}
      <button type="submit" disabled={isPending}>
        {isPending ? "Submitting..." : "Sign Up"}
      </button>
    </form>
  );
};

export default SignUpForm;
