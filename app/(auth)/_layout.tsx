import { useAuth } from "@/hooks/useAuth";
import { Redirect, Stack } from "expo-router";

export default function AuthLayout() {
  const auth = useAuth();

  if (auth.user) {
    return <Redirect href="/(app)/home" />;
  }

  return (
    <Stack initialRouteName="login" screenOptions={{ headerShown: false }} />
  );
}
