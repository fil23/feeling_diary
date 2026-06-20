import { supabase } from "@/utils/supabase";
import { User } from "@supabase/supabase-js";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { createContext, ReactNode, useState } from "react";

interface AuthContextType {
  user: User | null;
  login: (name: string, pass: string) => void;
  logout: () => void;
  loadUser: () => void;
  signIn: (email: string, password: string) => void;
  err: string | null;
  existToken: boolean;
  setExistToken: (e: boolean) => void;
  loading: boolean;
  setLoading: (l: boolean) => void;
  completeAuth: () => void;
}

interface Props {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [existToken, setExistToken] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // Login with email and password
  const login = async (name: string, password: string) => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    setLoading(true);
    setUser(null);
    await SecureStore.deleteItemAsync(process.env.EXPO_PUBLIC_TOKEN_NAME!);
    setLoading(false);
  };

  const loadUser = async () => {
    setLoading(true);
    const token = await SecureStore.getItemAsync(
      process.env.EXPO_PUBLIC_TOKEN_NAME!,
    );

    if (token === null) {
      console.error("I havn't found any token");
      setLoading(false);
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
    } finally {
      setLoading(false);
    }
  };

  const existT = async () => {
    const t = await SecureStore.getItemAsync(
      process.env.EXPO_PUBLIC_TOKEN_NAME!,
    );
    if (t === null) return setExistToken(false);
    return setExistToken(true);
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      //API call to supabase to sign in with email and password
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (data === null || error != null) {
        setErr("Sorry something went wrong!! Try again later");
        console.error("Data null or error during sign in" + error?.message);
        setLoading(false);
        return;
      }
      //se user for app context
      setUser(data.user);
    } catch (e: any) {
      setErr("Something went wrong!!");
      console.error("Error during sign in: " + e.message);
      return;
    } finally {
      setLoading(false);
    }
  };

  const completeAuth = async () => {
    setLoading(true);
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (session?.user.email_confirmed_at) {
        const t = session.access_token;
        await SecureStore.setItemAsync(process.env.EXPO_PUBLIC_TOKEN_NAME!, t);
        setLoading(false);
        router.replace("/(app)");
      } else {
        setLoading(false);
        router.replace("/(auth)/login");
      }
    } catch (e: any) {
      setErr("Somthing went wrong!");
      console.error("Token didn't save: " + e.message);
      return;
    } finally {
      setLoading(false);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        signIn,
        err,
        loadUser,
        existToken,
        setExistToken,
        loading,
        setLoading,
        completeAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
