declare interface ProductColor {
  color: string;
  quantity: number;
}

declare interface Product {
  id: number;
  name: string;
  description: string;
  small_description: string;
  price: string;
  quantity: string;
  status: string;
  category: string;
  brand: string;
  product_code: string;
  tags: string[];
  main_image: string;
  images: string[];
  product_colors: ProductColor[];
  is_favorite: number;
  created_at: string;
  updated_at: string;
}

declare interface Banner {
  id: number;
  banner: string;
  created_at: string;
  updated_at: string;
}
