export type Mood = {
  id: string;
  created_at: string;
  mood_vote: number;
  comment?: Comment;
};

export type DataMood = {
  mood_vote: number;
  created_at: string;
};

export type Comment = {
  id: string;
  created_at: string;
  comment: string;
};
