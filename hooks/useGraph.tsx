import { GraphContext } from "@/context/graphsContext";
import { useContext } from "react";

export const useGraph = () => {
  const con = useContext(GraphContext);

  if (!con) {
    throw new Error("useGraph must be used within GraphProvider");
  }

  return con;
};
