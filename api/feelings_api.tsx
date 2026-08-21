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

export async function saveDisable() {
  let startHour = new Date();
  startHour.setHours(startHour.getHours(), 0, 0, 0);

  let finishHour = new Date();
  finishHour.setHours(startHour.getHours(), 59, 59, 59);
  console.log(finishHour.toUTCString());
  console.log(startHour.toUTCString());
  const { count, error } = await supabase
    .from("moods")
    .select("*", { count: "exact", head: true })
    .gte("created_at", startHour.toISOString())
    .lte("created_at", finishHour.toISOString());

  if (error) throw new Error("Count errato");
  console.log(count);
  return count;
}
