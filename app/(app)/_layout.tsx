import { useAuth } from "@/hooks/useAuth";
import { Redirect, Stack } from "expo-router";

export default function PrivateLayout() {
  const { existToken, setExistToken } = useAuth();

  if (!existToken) {
    return <Redirect href="/(auth)/login" />;
  }

  return <Stack />;
}
