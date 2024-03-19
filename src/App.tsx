import { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";
import { useToast } from "./components/ui/use-toast";
import { TProduct, TProductResponse, TSlave } from "./types/Product";
import ProductsList from "./components/ProductsList";

function App() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<TProduct[]>([]);
  const [product, setProduct] = useState<TProduct[]>([]);
  const [allProducts, setAllProducts] = useState<TSlave[]>([]);
  const [uniqueProduct, setUniqueProducts] = useState<any[]>([]);
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
    function confirmCloseWindow(e: BeforeUnloadEvent) {
      e.preventDefault();
      e.returnValue = "";
    }

    window.addEventListener("beforeunload", confirmCloseWindow);

    return () => {
      window.removeEventListener("beforeunload", confirmCloseWindow);
    };
  }, []);

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

        if (parsed_products.length > 1) {
          let unique_products = {};
          if (product[0].is_unique !== "false") {
            const length = products.length;
            unique_products = parsed_products.map(
              (product: TProductResponse) => {
                let unique_product = {};
                Object.entries(product).forEach(() => {
                  unique_product = {
                    ["src_" + length]: product["src"],
                    ["name_" + length]: product["name"],
                    ["href_" + length]: product["href"],
                    ["highPrice_" + length]: product["highPrice"],
                    ["lowPrice_" + length]: product["lowPrice"],
                    country: product["country"],
                    ["main_id_" + length]: product["main_id"],
                  };
                });
                return unique_product;
              }
            );
            // @ts-ignore
            setUniqueProducts((prev) => [...prev, ...unique_products]);
          }
          setAllProducts((prev) => [...prev, ...parsed_products]);
          toast({
            title: "New products added successfully.",
            description: "Products for every country added successfully",
          });
        } else {
          throw new Error("Products not found.");
        }
      } catch (error: unknown) {
        toast({
          variant: "destructive",
          title: "Something went wrong",
          description: "Please try again later, or use script instead.",
        });
        console.error(error);
      } finally {
        setProduct([]);
        setLoading(false);
      }
    }

    if (product.length) {
      getData();
    }
  }, [product]);

  return (
    <>
      <ProductCard isLoading={loading} onSubmit={onSubmit} />
      <ProductsList
        setProduct={(product) => setProduct([product])}
        isLoading={loading}
        onDelete={(main_id) => {
          const delete_product = (item: any) => item.main_id !== main_id;
          setProducts((prev) => prev.filter(delete_product));
          setAllProducts((prev) => prev.filter(delete_product));
          setUniqueProducts((prev) => prev.filter(delete_product));
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
          setUniqueProducts((prev) => prev.map(update_product));
        }}
        uniqueProducts={uniqueProduct}
        allProducts={allProducts}
        products={products}
      />
    </>
  );
}

export default App;
