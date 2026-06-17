import { CustomCircularProgress } from "@/components/circular_progress_lading";
import { useAuth } from "@/hooks/useAuth";
import { Redirect } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";

export default function Index() {
  const { loadUser, setExistToken, existToken } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function getToken() {
      setLoading(true);
      const t = await SecureStore.getItemAsync(
        process.env.EXPO_PUBLIC_TOKEN_NAME!,
      );
      setLoading(false);
      setExistToken(!!t);
    }

    async function deleteT() {
      await SecureStore.deleteItemAsync(process.env.EXPO_PUBLIC_TOKEN_NAME!);
      setExistToken(false);
    }

    getToken();
    deleteT();
  }, []);

  {
    loading && <CustomCircularProgress />;
  }
  if (existToken) {
    setExistToken(true);
    loadUser();
    return <Redirect href={"/(app)"} />;
  }

  setExistToken(false);
  return <Redirect href={"/(auth)/login"} />;
}
