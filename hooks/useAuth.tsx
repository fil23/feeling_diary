import { AuthContext } from "@/context/authContext";
import { useContext } from "react";

export const useAuth = () => {
  const con = useContext(AuthContext);

  if (!con) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return con;
};
