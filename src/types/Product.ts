export type TProduct = {
  main_id: string;
  src: string;
  src_name: string;
  src_origin: string;
  table_name?: string;
};

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