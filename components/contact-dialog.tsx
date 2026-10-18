"use client";

import { useState } from "react";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "convex/react";
import { ArrowUpRight, LockIcon, LogInIcon, MailIcon, SendIcon } from "lucide-react";

import { api } from "@/convex/_generated/api";
import {
  contactMessageSchema,
  ContactMessageType,
} from "@/schemas/contactMessage.schema";
import { authClient } from "@/lib/auth-client";

import FormField from "@/components/common/form-field";
import Alert from "@/components/common/alert";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

/**
 * Hero "Get in touch" dialog.
 *
 * Submitting requires a signed-in session: the dialog walks visitors to
 * /sign-in (and back via the `redirect` param), and introduces them to Rahmita
 * with a name / title / message form. Email is never asked for on the form —
 * it comes from the session on the server, so nobody can impersonate another
 * address.
 */
const ContactDialog = ({ className }: { className?: string }) => {
  const { data: session } = authClient.useSession();
  const [open, setOpen] = useState(false);
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const sendMessage = useMutation(api.messages.sendMessage);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactMessageType>({
    resolver: zodResolver(contactMessageSchema),
  });

  const onSubmit: SubmitHandler<ContactMessageType> = async (data) => {
    setFormError("");
    setSubmitting(true);
    try {
      await sendMessage({
        name: data.name,
        title: data.title,
        body: data.body,
      });
      setSent(true);
      reset();
    } catch {
      setFormError("Failed to send the message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Dialog content swaps on auth state: gate for visitors, form for members.
  const renderBody = () => {
    if (!session) {
      return (
        <>
          <DialogHeader>
            <DialogTitle>Sign in to get in touch</DialogTitle>
            <DialogDescription>
              To keep introductions genuine, messaging is available to signed-in
              visitors only. Your email will come from your account, so Rahmita
              can reply to the right place.
            </DialogDescription>
          </DialogHeader>
          <Button
            nativeButton={false}
            render={
              <Link href="/sign-in?redirect=/" onClick={() => setOpen(false)} />
            }
          >
            <LogInIcon className="size-5" aria-hidden="true" />
            Sign in to continue
          </Button>
        </>
      );
    }

    if (sent) {
      return (
        <>
          <DialogHeader>
            <DialogTitle>Message sent!</DialogTitle>
            <DialogDescription>
              Thanks for the introduction — Rahmita got your message by email
              and will get back to you soon.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter showCloseButton />
        </>
      );
    }

    return (
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <DialogHeader>
          <DialogTitle>Get in touch</DialogTitle>
          <DialogDescription>
            Introduce yourself — tell Rahmita who you are and why you&apos;re
            reaching out.
          </DialogDescription>
        </DialogHeader>
        {formError && <Alert error message={formError} />}

        <FormField
          id="name"
          label="Name"
          register={register}
          errors={errors}
          placeholder="Your name"
          disabled={submitting}
        />
        <div>
          <label
            htmlFor="contact-email"
            className="text-muted-foreground mb-2 block text-sm font-medium"
          >
            Email
          </label>
          <div className="bg-muted border-border text-muted-foreground flex h-11 items-center gap-2 rounded border-2 px-3 text-sm shadow-xs justify-between hover:cursor-not-allowed">
            <div className="flex items-center gap-2">
              <MailIcon className="size-4 shrink-0" aria-hidden="true" />
              <span id="contact-email" className="truncate">
                {session?.user.email}
              </span>
            </div>
            <LockIcon className="size-4 shrink-0" aria-hidden="true" />
          </div>
          <p className="text-muted-foreground mt-1 text-xs">
            From your signed-in account — not editable.
          </p>
        </div>
        <FormField
          id="title"
          label="Title"
          register={register}
          errors={errors}
          placeholder="e.g. Product R&D collaboration"
          disabled={submitting}
        />
        <div>
          <label
            htmlFor="contact-body"
            className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Message
          </label>
          <Textarea
            id="contact-body"
            className="min-h-24 border-black"
            rows={5}
            disabled={submitting}
            placeholder="Introduce yourself — who are you and what would you like to discuss?"
            {...register("body")}
          />
          {errors.body && (
            <p className="mt-1 text-sm text-red-500">{errors.body.message}</p>
          )}
        </div>

        <DialogFooter>
          <Button type="submit" disabled={submitting}>
            <SendIcon className="size-5" aria-hidden="true" />
            {submitting ? "Sending..." : "Send message"}
          </Button>
        </DialogFooter>
      </form>
    );
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (!nextOpen) {
          setFormError("");
          setSent(false);
        }
      }}
    >
      <DialogTrigger render={<Button size="lg" className={className} />}>
        Get in touch
        <ArrowUpRight className="size-5" aria-hidden="true" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">{renderBody()}</DialogContent>
    </Dialog>
  );
};

export default ContactDialog;
