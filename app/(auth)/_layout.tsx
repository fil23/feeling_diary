import CustomCircularProgress from "@/components/circular_progress_lading";
import { CustomHeader } from "@/components/header";
import { useAuth } from "@/hooks/useAuth";
import { Redirect } from "expo-router";

export default function AuthLayout() {
  const { loading, user } = useAuth();

  if (user) {
    return <Redirect href="/(app)/home" />;
  }

  return loading ? <CustomCircularProgress /> : <CustomHeader />;
}
