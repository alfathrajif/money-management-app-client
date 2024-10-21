"use client";
import { ReactNode } from "react";
import { AuthContext } from "./(auth)/auth-context";
import { IProfile } from "@/types/user";

interface ProvidersProps {
  children: ReactNode;
  authenticated: boolean;
  profile: IProfile;
}

export default function Providers({
  children,
  authenticated,
  profile,
}: ProvidersProps) {
  return (
    <AuthContext.Provider value={{ authenticated, profile }}>
      {children}
    </AuthContext.Provider>
  );
}
