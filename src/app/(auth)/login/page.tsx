import AuthSwitch from "@/components/partials/auth/auth-switch";
import AuthTitle from "@/components/partials/auth/auth-title";
import FormLogin from "@/components/partials/auth/form-login";
import React from "react";

const LoginPage = () => {
  return (
    <div className="w-full max-w-sm space-y-5">
      <AuthTitle
        title="Login"
        description="Enter your email and password to access and manage your expenses."
      />
      <FormLogin />
      <AuthSwitch
        linkTitle="Sign Up"
        linkUrl="/sign-up"
        description="Don't have an account?"
      />
    </div>
  );
};

export default LoginPage;
