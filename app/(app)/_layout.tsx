import { useAuth } from "@/hooks/useAuth";
import { Redirect, Stack } from "expo-router";

export default function PrivateLayout() {
  const auth = useAuth();

  if (!auth.user) {
    return <Redirect href="/(auth)/login" />;
  }

  return <Stack />;
};
