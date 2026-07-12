import CustomCircularProgress from "@/components/circular_progress_lading";
import { useAuth } from "@/hooks/useAuth";
import { Redirect } from "expo-router";

export default function Index() {
  const { loading, setLoading, logout, user } = useAuth();

  {
    loading && <CustomCircularProgress />;
  }
  if (user) {
    return <Redirect href={"/(app)/home"} />;
  }

  return <Redirect href={"/(auth)/login"} />;
}
