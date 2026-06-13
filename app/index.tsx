import { useAuth } from "@/hooks/useAuth";
import { Redirect } from "expo-router";
import * as SecureStore from "expo-secure-store";

export default function Index() {
  const { loadUser } = useAuth();
  const token = async function getToken() {
    return await SecureStore.getItemAsync(process.env.EXPO_PUBLIC_TOKEN_NAME!);
  };

  if (token === null) {
    return <Redirect href={"/(auth)/login"} />;
  }
  loadUser(token.toString());
  return <Redirect href={"/(app)"} />;
}
