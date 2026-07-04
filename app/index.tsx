import { CustomCircularProgress } from "@/components/circular_progress_lading";
import { useAuth } from "@/hooks/useAuth";
import { Redirect } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect } from "react";

export default function Index() {
  const {
    loadUser,
    setExistToken,
    existToken,
    loading,
    setLoading,
    logout,
    user,
  } = useAuth();

  useEffect(() => {
    async function getToken() {
      setLoading(true);
      const t = await SecureStore.getItemAsync(
        process.env.EXPO_PUBLIC_TOKEN_NAME!,
      );
      setLoading(false);
      setExistToken(!!t);
    }

    getToken();
    // logout();
    console.table(user);
  }, []);

  {
    loading && <CustomCircularProgress />;
  }
  if (existToken) {
    setExistToken(true);
    loadUser();
    return <Redirect href={"/(app)/home"} />;
  }

  return <Redirect href={"/(auth)/login"} />;
}
