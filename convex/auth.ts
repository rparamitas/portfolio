import { components } from "./_generated/api";
import { internalAction, internalMutation, query } from "./_generated/server";
import authSchema from "./betterAuth/schema";
import { createClient, GenericCtx } from "@convex-dev/better-auth";
import { convex } from "@convex-dev/better-auth/plugins";
import { admin } from "better-auth/plugins/admin";
import { anonymous } from "better-auth/plugins/anonymous";
import { emailOTP } from "better-auth/plugins/email-otp";
import { genericOAuth } from "better-auth/plugins/generic-oauth";
import {
  sendMagicLink,
  sendOTPVerification,
  sendEmailVerification,
  sendResetPassword,
} from "../convex/email";
import { magicLink } from "better-auth/plugins/magic-link";
import { twoFactor } from "better-auth/plugins/two-factor";
import { username } from "better-auth/plugins/username";
import { betterAuth, type BetterAuthOptions } from "better-auth/minimal";
import { requireActionCtx } from "@convex-dev/better-auth/utils";
import { DataModel } from "./_generated/dataModel";
import { v } from "convex/values";
import authConfig from "./auth.config";

// This implementation uses Local Install as it would be in a new project.

const siteUrl = process.env.SITE_URL;

const ADMIN_EMAIL = "rparamitas@gmail.com";

export const authComponent = createClient<DataModel, typeof authSchema>(
  components.betterAuth,
  {
    local: {
      schema: authSchema,
    },
    verbose: false,
  },
);

export const createAuthOptions = (ctx: GenericCtx<DataModel>) => {
  return {
    baseURL: siteUrl,
    database: authComponent.adapter(ctx),
    // Better Auth's OAuth state cookie defaults to a 5-minute maxAge while the
    // server-side state record lives 10 minutes. Sitting too long on the
    // provider's consent screen expires the cookie and the callback fails with
    // "State not persisted correctly". Extending it to 15 minutes means the
    // record's own 10-minute expiry is what the user actually hits, and the
    // callback redirects back to /sign-in with a friendly error instead.
    advanced: {
      cookies: {
        state: {
          attributes: {
            maxAge: 60 * 15,
          },
        },
      },
    },
    account: {
      accountLinking: {
        enabled: true,
        allowDifferentEmails: true,
      },
    },
    emailVerification: {
      autoSignInAfterVerification: true,
      sendVerificationEmail: async ({ user, url }) => {
        await sendEmailVerification(requireActionCtx(ctx), {
          to: user.email,
          url,
        });
      },
    },
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: true,
      sendResetPassword: async ({ user, url }) => {
        await sendResetPassword(requireActionCtx(ctx), {
          to: user.email,
          url,
        });
      },
    },
    socialProviders: {
      github: {
        clientId: process.env.GITHUB_CLIENT_ID as string,
        clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      },
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      },
    },
    user: {
      deleteUser: {
        enabled: true,
      },
    },
    plugins: [
      admin(),
      anonymous(),
      username(),
      magicLink({
        sendMagicLink: async ({ email, url }) => {
          await sendMagicLink(requireActionCtx(ctx), {
            to: email,
            url,
          });
        },
      }),
      emailOTP({
        async sendVerificationOTP({ email, otp }) {
          await sendOTPVerification(requireActionCtx(ctx), {
            to: email,
            code: otp,
          });
        },
      }),
      twoFactor(),
      genericOAuth({
        config: [
          {
            providerId: "slack",
            clientId: process.env.SLACK_CLIENT_ID as string,
            clientSecret: process.env.SLACK_CLIENT_SECRET as string,
            discoveryUrl: "https://slack.com/.well-known/openid-configuration",
            scopes: ["openid", "email", "profile"],
          },
        ],
      }),
      convex({
        authConfig,
      }),
    ],
  } satisfies BetterAuthOptions;
};

export const createAuth = (ctx: GenericCtx<DataModel>) =>
  betterAuth(createAuthOptions(ctx));

export const { getAuthUser } = authComponent.clientApi();

export const rotateKeys = internalAction({
  args: {},
  handler: async (ctx) => {
    const auth = createAuth(ctx);
    return auth.api.rotateKeys();
  },
});

// Example functions, feel free to edit, omit, etc.

// Get the current user
export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    return authComponent.safeGetAuthUser(ctx);
  },
});

// Get a user by their Better Auth user id with Local Install
export const getUserById = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return ctx.runQuery(components.betterAuth.users.getUser, {
      userId: args.userId,
    });
  },
});

// One-time action to promote the admin account. Run with:
//   npx convex run auth:promoteAdmin
export const promoteAdmin = internalMutation({
  args: {},
  handler: async (ctx) => {
    const user = await ctx.runQuery(components.betterAuth.adapter.findOne, {
      model: "user",
      where: [{ field: "email", operator: "eq", value: ADMIN_EMAIL }],
    });
    if (!user) {
      throw new Error(
        `No user found with email ${ADMIN_EMAIL}. They need to sign up first.`,
      );
    }
    await ctx.runMutation(components.betterAuth.adapter.updateOne, {
      input: {
        model: "user",
        where: [{ field: "email", operator: "eq", value: ADMIN_EMAIL }],
        update: { role: "admin" },
      },
    });
    return { promoted: user._id };
  },
});
