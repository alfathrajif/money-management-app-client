"use client";
import { ReactElement } from "react";
import { AuthContext } from "./(auth)/auth-context";

interface ProvidersProps {
  children: ReactElement;
  authenticated: boolean;
}

export default function Providers({ children, authenticated }: ProvidersProps) {
  return (
    <AuthContext.Provider value={authenticated}>
      {children}
    </AuthContext.Provider>
  );
}
