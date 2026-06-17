import { supabase } from "@/utils/supabase";
import { User } from "@supabase/supabase-js";
import * as SecureStore from "expo-secure-store";
import { createContext, ReactNode, useState } from "react";

interface AuthContextType {
  user: User | null;
  login: (name: string, pass: string) => void;
  logout: () => void;
  loadUser: () => void;
  err: string | null;
  existToken: boolean;
  setExistToken: (e: boolean) => void;
}

interface Props {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [existToken, setExistToken] = useState<boolean>(false);

  // Login with email and password
  const login = async (name: string, password: string) => {
    try {
      // Call supabase api to take user
      const { data, error } = await supabase.auth.signInWithPassword({
        email: name,
        password: password,
      });

      if (error != null || data.user === null) {
        setErr("Sorry, I haven't find you!");
        return;
      }

      // set user in the app's context
      setUser(data.user);

      // save the token for future access
      const t = data.session?.access_token;

      if (data.session === null) {
        setErr("I didn't find any session!");
        return;
      }

      await SecureStore.setItemAsync(
        process.env.EXPO_PUBLIC_TOKEN_NAME!,
        t ?? "none",
      );
    } catch (e: any) {
      setErr(e.message);
      console.error("Error:" + e.message);
      return;
    }
  };

  // Logout function
  const logout = async () => {
    setUser(null);
    await SecureStore.deleteItemAsync(process.env.EXPO_PUBLIC_TOKEN_NAME!);
  };

  const loadUser = async () => {
    const token = await SecureStore.getItemAsync(
      process.env.EXPO_PUBLIC_TOKEN_NAME!,
    );

    if (token === null) {
      console.error("I havn't found any token");
      return;
    }

    try {
      const { data, error } = await supabase.auth.getUser(token);

      if (error != null || data.user === null) {
        setErr("Ooops... There is something wrong here!");
      }

      setUser(data.user);
      console.info("User has been loaded correctly!");
    } catch (error: any) {
      setErr(error.message);
      console.error("Error:" + error.message);
      return;
    }
  };

  const existT = async () => {
    const t = await SecureStore.getItemAsync(
      process.env.EXPO_PUBLIC_TOKEN_NAME!,
    );
    if (t === null) return setExistToken(false);
    return setExistToken(true);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, err, loadUser, existToken, setExistToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};
