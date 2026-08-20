import { supabase } from "@/utils/supabase";
import { Session, User } from "@supabase/supabase-js";
import { makeRedirectUri } from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { createContext, ReactNode, useEffect, useState } from "react";

WebBrowser.maybeCompleteAuthSession();

interface AuthContextType {
  user: User | null;
  login: (name: string, pass: string) => void;
  logout: () => void;
  signIn: (email: string, password: string) => void;
  signInWithGoogle: () => void;
  err: string | null;
  setErr: (s: string) => void;
  loading: boolean;
  setLoading: (l: boolean) => void;
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
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

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
    await supabase.auth.signOut();
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
          skipBrowserRedirect: false,
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

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        signIn,
        signInWithGoogle,
        err,
        setErr,
        loading,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
