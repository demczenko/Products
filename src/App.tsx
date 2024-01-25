import { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";
import { useToast } from "./components/ui/use-toast";
import { TProduct, TSlave } from "./types/Product";
import ProductsList from "./components/ProductsList";

const ORIGINS = {
  beliani: "https://beliani.us:7777",
  local: "http://localhost:7777",
};

function App() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<TProduct[]>([]);
  const [product, setProduct] = useState<TProduct[]>([]);
  const [allProducts, setAllProducts] = useState<TSlave[]>([]);
  const { toast } = useToast();

  const onSubmit = (form: FormData, cb: () => void) => {
    let product = {} as TProduct;
    for (const [key, value] of form.entries()) {
      let k = key as keyof TProduct;
      let v = value as string;
      product[k] = v;
    }

    product["src"] = product["src_origin"] + product["src_name"];

    setProducts((prev) => [...prev, product]);
    setProduct([product]);
    toast({
      title: "Form submission",
      description: "Product was successfully added",
    });
    cb();
  };

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const response = await fetch(`${ORIGINS.local}/get-products/`, {
          method: "POST",
          body: JSON.stringify(product),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const parsed_products = await response.json();
        if (parsed_products.length > 0) {
          setAllProducts((prev) => [...prev, ...parsed_products]);
          toast({
            title: "New products added successfully.",
            description: "Products for every country added successfully",
          });
        } else {
          toast({
            variant: "destructive",
            title: "Something went wrong",
            description: "Please try again later, or use script instead.",
          });
        }
      } catch (error: unknown) {
        console.error(error);
        toast({
          variant: "destructive",
          title: "Something went wrong",
          description: "Please try again later, or use script instead.",
        });
      } finally {
        setProduct([]);
        setLoading(false);
      }
    }

    if (product.length) {
      getData();
    }
  }, [product]);

  console.log(products);

  return (
    <>
      <ProductCard isLoading={loading} onSubmit={onSubmit} />
      <ProductsList
        onDelete={(main_id) => {
          const delete_product = (item: any) => item.main_id !== main_id;
          setProducts((prev) => prev.filter(delete_product));
          setAllProducts((prev) => prev.filter(delete_product));
        }}
        onChange={(product) => {
          const update_product = (item: any) => {
            if (item.main_id === product.main_id) {
              return {
                ...item,
                src: product.src,
              };
            }
            return item;
          };

          setProducts((prev) => prev.map(update_product));
          setAllProducts((prev) => prev.map(update_product));
        }}
        allProducts={allProducts}
        products={products}
      />
    </>
  );
}

export default App;
