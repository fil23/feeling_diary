import { CustomHeader } from "@/components/header";
import { useTheme } from "@/context/themeContext";
import { useAuth } from "@/hooks/useAuth";
import { Redirect } from "expo-router";

export default function AuthLayout() {
  const auth = useAuth();
  const { theme } = useTheme();

  if (auth.user) {
    return <Redirect href="/(app)" />;
  }

  return <CustomHeader t="Login" />;
}
