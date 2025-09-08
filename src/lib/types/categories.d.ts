declare interface Category {
  id: number;
  name: string;
  tags: string[];
  image: string;
  status: "active" | "inactive";
  created_at: string;
  updated_at: string;
}
