export type User = {
  id: string;
  email: string;
  role: string;
  created_at: Date;
  deleted_at: Date;
  banned: boolean;
  blcoked: boolean;
};
