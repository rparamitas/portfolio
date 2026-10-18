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
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { authClient } from "@/lib/auth-client";
import { FaGoogle } from "react-icons/fa";
import { LockIcon, MailIcon } from "lucide-react";

type SignInFormProps = {
  redirectTo: string;
  oauthError?: string;
};

// Error codes Better Auth appends to errorCallbackURL when the OAuth callback
// fails (state_mismatch covers expired/interrupted sign-in sessions).
const OAUTH_ERROR_MESSAGES: Record<string, string> = {
  state_mismatch:
    "Your sign-in session expired or was interrupted. Please try signing in again.",
  access_denied:
    "Sign-in was cancelled before it was completed. Please try again.",
  no_code:
    "The provider didn't return an authorization code. Please try signing in again.",
  invalid_callback_request:
    "The sign-in response from the provider was invalid. Please try again.",
};

const getOAuthErrorMessage = (code: string) =>
  OAUTH_ERROR_MESSAGES[code] ??
  `Sign-in failed. Please try again. (code: ${code})`;

const SignInForm = ({ redirectTo, oauthError }: SignInFormProps) => {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [isGooglePending, setIsGooglePending] = useState(false);
  const [isResendPending, setIsResendPending] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | undefined>(
    oauthError ? getOAuthErrorMessage(oauthError) : "",
  );
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
      rememberMe,
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
    router.push(redirectTo);
    router.refresh();
  };

  const handleSocialSignIn = async (provider: "google") => {
    setError("");
    setSuccess("");
    if (provider === "google") {
      setIsGooglePending(true);
    } else {
      null;
    }
    const { error } = await authClient.signIn.social({
      provider,
      callbackURL: redirectTo,
      // Send OAuth callback failures (expired state, cancelled consent, ...)
      // back to this page instead of Better Auth's default error page.
      errorCallbackURL: `/sign-in?redirect=${encodeURIComponent(redirectTo)}`,
    });
    if (error) {
      if (provider === "google") {
        setIsGooglePending(false);
      } else {
        null;
      }
      setError(error.message ?? "Failed to start sign-in. Please try again.");
    }
  };

  const handleResendVerification = async () => {
    const email = unverifiedEmail ?? getValues("email");
    setIsResendPending(true);
    const { error } = await authClient.sendVerificationEmail({
      email,
      callbackURL: redirectTo,
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
      {error && <Alert error message={error} />}
      {success && <Alert success message={success} />}

      <div className="flex flex-col gap-3">
        <Button
          type="button"
          variant="secondary"
          className="w-full"
          disabled={isGooglePending || isPending}
          onClick={() => handleSocialSignIn("google")}
        >
          <FaGoogle />
          {isGooglePending
            ? "Redirecting to Google..."
            : "Continue with Google"}
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Separator className="flex-1" />
        <span className="text-muted-foreground text-sm">or</span>
        <Separator className="flex-1" />
      </div>

      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className="flex w-full flex-col gap-4"
      >
        <FormField
          id="email"
          label="Email"
          register={register}
          errors={errors}
          placeholder="you@example.com"
          type="email"
          disabled={isPending}
          icon={<MailIcon />}
        />
        <FormField
          id="password"
          label="Password"
          register={register}
          errors={errors}
          placeholder="••••••••"
          type="password"
          disabled={isPending}
          icon={<LockIcon />}
          passwordToggle
        />

        <div className="flex items-center justify-between">
          <label
            htmlFor="remember"
            className="flex cursor-pointer items-center gap-2 text-sm font-medium"
          >
            <Checkbox
              id="remember"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked)}
            />
            Remember me
          </label>
        </div>

        {unverifiedEmail && (
          <Button
            type="button"
            variant="outline"
            className="w-full"
            disabled={isResendPending}
            onClick={handleResendVerification}
          >
            {isResendPending ? "Resending..." : "Resend verification email"}
          </Button>
        )}

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Signing in..." : "Sign In"}
        </Button>
      </form>

      <p className="text-muted-foreground text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link
          href="/sign-up"
          className="hover:text-foreground font-medium underline"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default SignInForm;
