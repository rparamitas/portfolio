import Image from "next/image";
import SignInForm from "./components/form";
import { safeRedirectTo } from "@/lib/utils";

type SignInPageProps = {
  searchParams: Promise<{
    redirect?: string | string[];
    error?: string | string[];
  }>;
};

const SignInPage = async ({ searchParams }: SignInPageProps) => {
  const { redirect, error } = await searchParams;

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col overflow-hidden rounded-lg border-2 border-black bg-card shadow-lg lg:h-[min(48rem,calc(100vh-4rem))] lg:flex-row">
      <div className="flex flex-1 flex-col justify-center p-6 sm:p-10">
        <h1 className="font-head text-3xl font-bold">Sign In</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Pick a provider, or use the email you signed up with.
        </p>
        <div className="mt-6">
          <SignInForm
            redirectTo={safeRedirectTo(redirect)}
            oauthError={Array.isArray(error) ? error[0] : error}
          />
        </div>
      </div>
      <div className="relative hidden flex-1 lg:block">
        <Image
          src="/illustrations/illuminati_2.png"
          alt="Symmetrical flat-graphic artwork: a black pupil inside a yellow starburst eye, flanked by green leaves and blue teardrops over blocks of red, green and yellow with dotted and dashed textures"
          fill
          priority
          sizes="(max-width: 1024px) 0px, 50vw"
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default SignInPage;
