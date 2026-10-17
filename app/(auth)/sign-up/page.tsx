import Image from "next/image";
import SignUpForm from "./components/form";
import { safeRedirectTo } from "@/lib/utils";

type SignUpPageProps = {
  searchParams: Promise<{ redirect?: string | string[] }>;
};

const SignUpPage = async ({ searchParams }: SignUpPageProps) => {
  const { redirect } = await searchParams;

  return (
    <div className="bg-card mx-auto flex w-full max-w-5xl flex-col overflow-hidden rounded-lg border-2 border-black shadow-lg lg:h-[min(48rem,calc(100vh-4rem))] lg:flex-row">
      <div className="flex flex-1 flex-col justify-center p-6 sm:p-10">
        <h1 className="font-head text-3xl font-bold">Sign Up</h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Create an account to get started.
        </p>
        <div className="mt-6">
          <SignUpForm redirectTo={safeRedirectTo(redirect)} />
        </div>
      </div>
      <div className="relative hidden flex-1 lg:block">
        <Image
          src="/featured/formulation-process.png"
          alt="Formulation lab: gloved hands filling a beaker with yellow liquid beside open jars of cream, a mortar and pestle, and amber dropper bottles"
          fill
          priority
          sizes="(max-width: 1024px) 0px, 50vw"
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default SignUpPage;
