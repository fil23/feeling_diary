import { useAuth } from "@/hooks/useAuth";
import { Redirect } from "expo-router";

export default function Index() {
  const auth = useAuth();

  if (auth.user === null) {
    return <Redirect href={"/(auth)/login"} />;
  }

  return <Redirect href={"/(app)"} />;
}
