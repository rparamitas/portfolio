import VerifyEmail from "./emails/verifyEmail";
import MagicLinkEmail from "./emails/magicLink";
import VerifyOTP from "./emails/verifyOTP";
import ResetPasswordEmail from "./emails/resetPassword";
import ContactMessageEmail from "./emails/contactMessage";
import { render } from "@react-email/components";
import { components } from "./_generated/api";
import { Resend } from "@convex-dev/resend";
import { type ActionCtx } from "./_generated/server";

// TODO: replace with your verified Resend sender, e.g. "Portfolio <no-reply@yourdomain.com>"
const EMAIL_FROM = "Rahmita <no-reply@rahmita.my.id>";

export const resend = new Resend(components.resend, {
  testMode: false,
});

export const sendEmailVerification = async (
  ctx: ActionCtx,
  {
    to,
    url,
  }: {
    to: string;
    url: string;
  },
) => {
  await resend.sendEmail(ctx, {
    from: EMAIL_FROM,
    to,
    subject: "Verify your email address",
    html: await render(<VerifyEmail url={url} />),
  });
};

export const sendOTPVerification = async (
  ctx: ActionCtx,
  {
    to,
    code,
  }: {
    to: string;
    code: string;
  },
) => {
  await resend.sendEmail(ctx, {
    from: EMAIL_FROM,
    to,
    subject: "Verify your email address",
    html: await render(<VerifyOTP code={code} />),
  });
};

export const sendMagicLink = async (
  ctx: ActionCtx,
  {
    to,
    url,
  }: {
    to: string;
    url: string;
  },
) => {
  await resend.sendEmail(ctx, {
    from: EMAIL_FROM,
    to,
    subject: "Sign in to your account",
    html: await render(<MagicLinkEmail url={url} />),
  });
};

export const sendResetPassword = async (
  ctx: ActionCtx,
  {
    to,
    url,
  }: {
    to: string;
    url: string;
  },
) => {
  await resend.sendEmail(ctx, {
    from: EMAIL_FROM,
    to,
    subject: "Reset your password",
    html: await render(<ResetPasswordEmail url={url} />),
  });
};

// Notification for messages submitted via the hero "Get in touch" dialog —
// `replyTo` points at the sender so Rahmita can answer straight from her inbox.
export const sendContactMessageNotification = async (
  ctx: ActionCtx,
  {
    to,
    name,
    email,
    title,
    body,
  }: {
    to: string;
    name: string;
    email: string;
    title: string;
    body: string;
  },
) => {
  await resend.sendEmail(ctx, {
    from: EMAIL_FROM,
    to,
    replyTo: [email],
    subject: `Portfolio message: ${title}`,
    html: await render(
      <ContactMessageEmail
        name={name}
        email={email}
        title={title}
        body={body}
      />,
    ),
  });
};
