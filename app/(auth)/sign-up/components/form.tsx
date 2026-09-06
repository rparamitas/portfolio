"use client";

import { useState } from "react";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, SignUpType } from "@/schemas/signUp.schema";
import FormField from "@/components/common/form-field";
import Alert from "@/components/common/alert";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

const SignUpForm = () => {
  const [isPending, setIsPending] = useState(false);
  const [isResendPending, setIsResendPending] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpType>({
    resolver: zodResolver(signUpSchema),
  });

  const handleSubmitForm: SubmitHandler<SignUpType> = async (data) => {
    setError("");
    setSuccess("");
    setIsPending(true);
    const { error } = await authClient.signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
    });
    setIsPending(false);

    if (error) {
      setError(error.message ?? "Failed to sign up. Please try again.");
      return;
    }
    // Email verification is required before the session becomes active.
    setSubmittedEmail(data.email);
  };

  const handleResendVerification = async () => {
    if (!submittedEmail) return;
    setIsResendPending(true);
    const { error } = await authClient.sendVerificationEmail({
      email: submittedEmail,
      callbackURL: "/",
    });
    setIsResendPending(false);

    if (error) {
      setError(error.message ?? "Failed to resend the verification email.");
      return;
    }
    setError("");
    setSuccess("Verification email sent. Please check your inbox.");
  };

  if (submittedEmail) {
    return (
      <div className="flex w-full flex-col gap-4">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Check your inbox</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            We sent a verification link to{" "}
            <span className="font-medium text-foreground">{submittedEmail}</span>.
            Click it to activate your account — you&apos;ll be signed in
            automatically afterwards.
          </p>
        </div>
        {error && <Alert error message={error} />}
        {success && <Alert success message={success} />}
        <Button
          type="button"
          variant="secondary"
          className="w-full"
          disabled={isResendPending}
          onClick={handleResendVerification}
        >
          {isResendPending ? "Resending..." : "Resend verification email"}
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          Already verified?{" "}
          <Link href="/sign-in" className="font-medium underline hover:text-foreground">
            Sign in
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-4">
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
        {success && <Alert success message={success} />}
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Submitting..." : "Sign Up"}
        </Button>
      </form>
      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/sign-in" className="font-medium underline hover:text-foreground">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default SignUpForm;
