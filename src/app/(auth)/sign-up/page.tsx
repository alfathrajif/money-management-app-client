import AuthSwitch from "@/components/partials/auth/auth-switch";
import AuthTitle from "@/components/partials/auth/auth-title";
import FormSignUp from "@/components/partials/auth/form-signup";

const SignUpPage = () => {
  return (
    <div className="w-full max-w-sm space-y-5">
      <AuthTitle
        title="Sign Up"
        description="Create an account to access and manage your expenses."
      />
      <FormSignUp />
      <AuthSwitch
        linkTitle="Login"
        linkUrl="/login"
        description="Have an account?"
      />
    </div>
  );
};

export default SignUpPage;
