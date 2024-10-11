import React from "react";
import Link from "next/link";

interface AuthSwitchProps {
  linkTitle: string;
  linkUrl: string;
  description: string;
}

const AuthSwitch = ({ linkTitle, linkUrl, description }: AuthSwitchProps) => {
  return (
    <div className="text-center text-sm text-muted-foreground">
      {description}{" "}
      <Link href={linkUrl} className="underline hover:no-underline">
        {linkTitle}
      </Link>
    </div>
  );
};

export default AuthSwitch;
