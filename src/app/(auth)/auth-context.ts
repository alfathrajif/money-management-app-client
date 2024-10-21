import { IProfile } from "@/types/user";
import { createContext } from "react";

interface AuthContextType {
  authenticated: boolean;
  profile: IProfile | null;
}

export const AuthContext = createContext<AuthContextType>({
  authenticated: false,
  profile: null,
});
