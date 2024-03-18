export type TProduct = {
  main_id: string;
  src: string;
  src_name: string;
  src_origin: string;
  table_name?: string;
  is_unique: string
};

export type TProductResponse = {
  src: string
  size: string
  name: string
  main_id: string
  country: string
  href: string
  lowPrice: string
  highPrice: string
}


export type TSlave = {
  main_id: string;
  src: string;
  table_name?: string;
  country: string;
  highPrice: string;
  href: string;
  lowPrice: string;
  name: string;
};