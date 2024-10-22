export interface Product {
  product_group: string;
  rrp_price: string;
  variant: any[];
  remark:string;
  gender: string;
  currency: string;
  id: string;
  name: string;
  price: string;
  master_code: string;
  product_status: string;
  cover_image: string;
  colors: string[];
  size_range: string;
  created_by_company: string;
  category:string;
  collection:string;
}
export interface ProducDetail {
  main_product_data: MainProductData;
  product_varaints: ProductVaraint[];
  type?:string
}

export interface MainProductData {
  end_of_life: string;
  id: string;
  name: string;
  master_code: string;
  cover_image: string;
  product_status: string;
  product_group: string;
  season: string;
  gender: string;
  product_class: string;
  collection: string;
  category: string;
  brand: string;
  is_club: boolean;
  club_name: string;
  remark: string;
  launch_date: string;
  size_chart: string;
  pack_size: string;
  current_supplier: string;
  description: string;
  fabric_content: string;
  fabric_type: string;
  weight: number;
  created_by_company: string;
  created_by: string;
  edited_by: string;
  created_at: string;
  updated_at: string;
}

export interface ProductVaraint {
  product_id: string;
  product_code: string;
  color_code: string;
  front_image: string;
  back_image: string;
  stock: any[];
}

export interface FilteredProductData {
  cover_image: string;
  variants: {
    front_image: string;
    back_image: string;
  }[];
}
