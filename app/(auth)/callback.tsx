
import { useAuth } from "@/hooks/useAuth";
import { CircularProgressIndicator } from "@expo/ui/jetpack-compose";
import { useEffect } from "react";

export default function CallBack() {
  const { completeAuth, loading } = useAuth();
  useEffect(() => {
    completeAuth();
  }, []);

  return loading ? <CircularProgressIndicator /> : null;
}
