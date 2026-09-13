import SignUpForm from "./components/form";
import { safeRedirectTo } from "@/lib/utils";

type SignUpPageProps = {
  searchParams: Promise<{ redirect?: string | string[] }>;
};

const SignUpPage = async ({ searchParams }: SignUpPageProps) => {
  const { redirect } = await searchParams;

  return (
    <div>
      <SignUpForm redirectTo={safeRedirectTo(redirect)} />
    </div>
  );
};

export default SignUpPage;
