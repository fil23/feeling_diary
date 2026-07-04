import { supabase } from "@/utils/supabase";
import { User } from "@supabase/supabase-js";
import { makeRedirectUri } from "expo-auth-session";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import * as WebBrowser from "expo-web-browser";
import { createContext, ReactNode, useState } from "react";

WebBrowser.maybeCompleteAuthSession();

interface AuthContextType {
  user: User | null;
  login: (name: string, pass: string) => void;
  logout: () => void;
  loadUser: () => void;
  signIn: (email: string, password: string) => void;
  signInWithGoogle: () => void;
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

const getAuthTokensFromUrl = (url: string) => {
  const [, queryString] = url.split("?");
  const [, fragmentString] = url.split("#");
  const params = new URLSearchParams(queryString ?? "");
  const fragmentParams = new URLSearchParams(fragmentString ?? "");

  fragmentParams.forEach((value, key) => {
    params.set(key, value);
  });

  return {
    accessToken: params.get("access_token"),
    refreshToken: params.get("refresh_token"),
    authCode: params.get("code"),
  };
};

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [existToken, setExistToken] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const completeLogin = async (sessionUser: User, accessToken: string) => {
    await SecureStore.setItemAsync(
      process.env.EXPO_PUBLIC_TOKEN_NAME!,
      accessToken,
    );
    setUser(sessionUser);
    setExistToken(true);
    router.replace("/(app)/home");
  };

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
        throw error;
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
        throw error;
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

  const signInWithGoogle = async () => {
    setLoading(true);
    const redirectTo = makeRedirectUri({
      scheme: "alone",
      path: "callback",
    });
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: redirectTo,
          skipBrowserRedirect: true,
        },
      });

      if (error) {
        setErr("Error during google sign in");
        throw error;
      }

      if (data.url) {
        const result = await WebBrowser.openAuthSessionAsync(
          data.url,
          redirectTo,
        );

        if (result.type === "success") {
          const { accessToken, refreshToken, authCode } = getAuthTokensFromUrl(
            result.url,
          );

          if (authCode) {
            const { data: sessionData, error: sessionError } =
              await supabase.auth.exchangeCodeForSession(authCode);

            if (sessionError || !sessionData.session) {
              setErr("Error during google sign in");
              throw sessionError;
            }

            await completeLogin(
              sessionData.session.user,
              sessionData.session.access_token,
            );
            return;
          }

          if (!accessToken || !refreshToken) {
            setErr("Google sign in didn't return a valid session");
            return;
          }

          const { data: sessionData, error: sessionError } =
            await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken,
            });

          if (sessionError || !sessionData.session) {
            setErr("Error during google sign in");
            throw sessionError;
          }

          await completeLogin(
            sessionData.session.user,
            sessionData.session.access_token,
          );
        }
      }
    } catch (e: any) {
      setErr("Error during google sign in");
      console.error("Error during google sign in:" + e.message);
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
        await completeLogin(session.user, session.access_token);
        setLoading(false);
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
        signInWithGoogle,
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
