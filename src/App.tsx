import { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";
import { useToast } from "./components/ui/use-toast";
import { TProduct } from "./types/Product";
import ProductsList from "./components/ProductsList";

function App() {
  const [error, setError] = useState("");
  const [products, setProducts] = useState<TProduct[]>([]);
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
    toast({
      title: "Form submission",
      description: "Product was successfully added",
    });
    cb();
  };

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch(`https://beliani.us:7777/get-products/`, {
          method: "POST",
          body: JSON.stringify(products),
          headers: {
            "Content-Type": "application/json",
          },
        });
        setAllProducts(await response.json());
      } catch (error: unknown) {
        setError(JSON.stringify(error));
      }
    }

    if (products.length) {
      getData();
    }
  }, [products]);

  return (
    <>
      <ProductCard onSubmit={onSubmit} />
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
