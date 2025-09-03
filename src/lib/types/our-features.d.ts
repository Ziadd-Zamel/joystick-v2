declare interface Advantage {
  id: number;
  title: {
    ar: string;
    en: string;
  };
  description: {
    ar: string;
    en: string;
  };
  img: string;
  created_at: string;
  updated_at: string;
}

declare type Advantages = Advantage[];
