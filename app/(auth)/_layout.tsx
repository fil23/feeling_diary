import { CustomHeader } from "@/components/header";
import { useAuth } from "@/hooks/useAuth";
import { Redirect } from "expo-router";

export default function AuthLayout() {
  const { existToken } = useAuth();

  if (existToken) {
    return <Redirect href="/(app)/home" />;
  }

  return <CustomHeader />;
}
