import { Comment, DataMood } from "@/types/moods";
import { supabase } from "@/utils/supabase";
import { createContext, ReactNode, useState } from "react";

interface GraphContextType {
  loading: boolean;
  error: string | null;
  getTodayMoods: (user_id: string) => Promise<void>;
  todayMoods: DataMood[];
  getTodayComments: (user_id: string) => Promise<void>;
  todayComments: Comment[];
}

interface Props {
  children: ReactNode;
}

export const GraphContext = createContext<GraphContextType | null>(null);

export const GraphProvider = ({ children }: Props) => {
  const [todayMoods, setTodayMoods] = useState<DataMood[]>([]);
  const [todayComments, setTodayComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getTodayMoods = async (user_id: string) => {
    setLoading(true);
    const mid = new Date(new Date());
    mid.setHours(0, 0, 0, 0);
    try {
      const { data, error } = await supabase
        .from("moods")
        .select(`mood_vote,created_at`)
        .gt("created_at", mid.toISOString())
        .eq("user_id", user_id);

      if (error) {
        throw error;
      }

      console.log("Mood votes: " + data);
      setTodayMoods(data ?? []);
    } catch (e: any) {
      setError("something went wrong");
      console.error("Error durign getTodaysMoods: " + e.message);
      return;
    } finally {
      setLoading(false);
    }
  };

  const getTodayComments = async (user_id: string) => {
    setLoading(true);
    const mid = new Date(new Date());
    mid.setHours(0, 0, 0, 0);
    try {
      const { data, error } = await supabase
        .from("comments")
        .select()
        .gt("created_at", mid.toISOString())
        .eq("user_id", user_id);

      if (error) {
        throw error;
      }

      if (data.length == 0) {
        setError("I didn't find anything!");
        return;
      }

      console.log("Comments: " + data);
      setTodayComments(data ?? []);
    } catch (error) {
      setError("something went wrong");
      return;
    }
  };

  return (
    <GraphContext.Provider
      value={{
        loading,
        error,
        getTodayMoods,
        todayMoods,
        getTodayComments,
        todayComments,
      }}
    >
      {children}
    </GraphContext.Provider>
  );
};
