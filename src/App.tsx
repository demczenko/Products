import { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";
import { useToast } from "./components/ui/use-toast";
import { TProduct } from "./types/Product";
import ProductsList from "./components/ProductsList";

function App() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<TProduct[]>([]);
  const [product, setProduct] = useState<TProduct[]>();
  const [allProducts, setAllProducts] = useState<TProduct[]>([]);
  const { toast } = useToast();

  const onSubmit = (form: FormData, cb: () => void) => {
    let product = {} as TProduct;
    for (const [key, value] of form.entries()) {
      let k = key as keyof TProduct;
      let v = value as string;
      product[k] = v;
    }

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
        const response = await fetch(`https://beliani.us:7777/get-products/`, {
          method: "POST",
          body: JSON.stringify(product),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const parsed_products = await response.json();
        setAllProducts((prev) => [...prev, ...parsed_products]);
        toast({
          title: "New products added successfully.",
          description: "Please try again later, or use script instead.",
        });
      } catch (error: unknown) {
        console.error(error);
        toast({
          title: "Something went wrong",
          description: "Please try again later, or use script instead.",
        });
      } finally {
        setLoading(false);
      }
    }

    if (products.length) {
      getData();
    }
  }, [products]);

  return (
    <>
      <ProductCard isLoading={loading} onSubmit={onSubmit} />
      <ProductsList
        onDelete={(main_id) =>
          setProducts((prev) => prev.filter((item) => item.main_id !== main_id))
        }
        allProducts={allProducts}
        products={products}
      />
    </>
  );
}

export default App;
