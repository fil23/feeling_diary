import { User } from "@/types/user";
import { createContext, ReactNode, useState } from "react";

interface AuthContextType {
  user: User | null;
  login: (name: string, pass: string) => void;
  logout: () => void;
}

interface Props {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (name: string, password: string) => {
    null;
  };

  const logout = () => {};

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
