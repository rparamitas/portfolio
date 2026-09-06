"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, SignInType } from "@/schemas/signIn.schema";
import FormField from "@/components/common/form-field";
import Alert from "@/components/common/alert";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { authClient } from "@/lib/auth-client";
import { FaGoogle } from "react-icons/fa";

const SignInForm = () => {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [isGooglePending, setIsGooglePending] = useState(false);
  const [isResendPending, setIsResendPending] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [unverifiedEmail, setUnverifiedEmail] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<SignInType>({
    resolver: zodResolver(signInSchema),
  });

  const handleSubmitForm: SubmitHandler<SignInType> = async (data) => {
    setError("");
    setSuccess("");
    setUnverifiedEmail(null);
    setIsPending(true);
    const { error } = await authClient.signIn.email({
      email: data.email,
      password: data.password,
    });
    setIsPending(false);

    if (error) {
      if (error.code === "EMAIL_NOT_VERIFIED") {
        setUnverifiedEmail(data.email);
        setError(
          "Your email hasn't been verified yet. Check your inbox for the verification link, or resend it below.",
        );
        return;
      }
      setError(error.message ?? "Failed to sign in. Please try again.");
      return;
    }
    router.push("/");
    router.refresh();
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setSuccess("");
    setIsGooglePending(true);
    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
    if (error) {
      setIsGooglePending(false);
      setError(error.message ?? "Failed to start Google sign-in. Please try again.");
    }
  };

  const handleResendVerification = async () => {
    const email = unverifiedEmail ?? getValues("email");
    setIsResendPending(true);
    const { error } = await authClient.sendVerificationEmail({
      email,
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

  return (
    <div className="flex w-full flex-col gap-4">
      <form onSubmit={handleSubmit(handleSubmitForm)} className="w-full">
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
        {error && <Alert error message={error} />}
        {success && <Alert success message={success} />}
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Signing in..." : "Sign In"}
        </Button>
      </form>

      {unverifiedEmail && (
        <Button
          type="button"
          variant="secondary"
          className="w-full"
          disabled={isResendPending}
          onClick={handleResendVerification}
        >
          {isResendPending ? "Resending..." : "Resend verification email"}
        </Button>
      )}

      <div className="flex items-center gap-2">
        <Separator className="flex-1" />
        <span className="text-sm text-muted-foreground">or</span>
        <Separator className="flex-1" />
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full"
        disabled={isGooglePending || isPending}
        onClick={handleGoogleSignIn}
      >
        <FaGoogle />
        {isGooglePending ? "Redirecting to Google..." : "Sign in with Google"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/sign-up" className="font-medium underline hover:text-foreground">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default SignInForm;
