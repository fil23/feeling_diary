import { supabase } from "@/utils/supabase";

export async function saveMood(vote: number, idUser: string): Promise<string> {
  const { data, error } = await supabase
    .from("moods")
    .insert({ mood_vote: vote, user_id: idUser })
    .select("id");

  if (error) throw new Error("Creazione mood non valida");
  return data[0].id;
}

export async function saveComment(
  id_vote: string,
  comment: string,
  idUser: string,
) {
  const { error } = await supabase
    .from("comments")
    .insert({ comment: comment, id_mood: id_vote, user_id: idUser });

  if (error) throw new Error("Error during the commment creation");
}
