export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  categoryId: number;
}

interface Announcement {
  url: string;
}

export interface SliderProps {
  announcements: Announcement[];
}

export interface ICategory {
  name: string;
}
