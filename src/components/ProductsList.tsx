import { Copy, Download } from "lucide-react";
import Container from "./Container";
import ProductCart from "./ProductCart";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { TProduct, TSlave } from "@/types/Product";
import { useToast } from "./ui/use-toast";

const ProductsList = ({
  products,
  onDelete,
  onChange,
  allProducts,
  uniqueProducts,
  isLoading,
  setProduct,
}: {
  setProduct: (product: TProduct) => void;
  isLoading: boolean;
  allProducts: TSlave[];
  uniqueProducts: any[];
  products: TProduct[];
  onDelete: (id: string) => void;
  onChange: (product: TProduct) => void;
}) => {
  const { toast } = useToast();

  const onCopy = () => {
    window.navigator.clipboard.writeText(JSON.stringify(products));
    toast({
      title: "Copied successfully",
      description: "Products has been successfully copied to clipboard",
    });
  };

  const onCopyAll = () => {
    window.navigator.clipboard.writeText(JSON.stringify(allProducts));
    toast({
      title: "Copied successfully",
      description: "Products has been successfully copied to clipboard",
    });
  };

  const onCopyAllUnique = () => {
    window.navigator.clipboard.writeText(JSON.stringify(uniqueProducts));
    toast({
      title: "Copied successfully",
      description: "Products has been successfully copied to clipboard",
    });
  };

  const onCopyFormula = async () => {
    const response = await fetch(
      "https://raw.githubusercontent.com/demczenko/script/main/parse.js"
    );
    const data = await response.text();

    window.navigator.clipboard.writeText(
      "const ids = " + JSON.stringify(products) + data
    );
    toast({
      title: "Copied successfully",
      description: "Function has been successfully download",
    });
  };

  return (
    <Container align="items-start">
      <div className="w-full h-full bg-slate-200 p-2">
        <div className="flex justify-between items-center">
          {products.length > 0 && (
            <h2 className="text-3xl font-semibold tracking-tight mb-2">
              Products
            </h2>
          )}
          {products.length > 0 && (
            <div className="flex items-center gap-2">
              <Button onClick={onCopy} variant={"ghost"} size={"sm"}>
                Main products <Copy className="w-4 h-4 ml-2" />
              </Button>
              {uniqueProducts.length > 0 && (
                <Button onClick={onCopyAllUnique} variant={"ghost"} size={"sm"}>
                  Unique products
                  <Copy className="w-4 h-4 ml-2" />
                </Button>
              )}
              {allProducts.length > 0 && (
                <Button onClick={onCopyAll} variant={"ghost"} size={"sm"}>
                  All products
                  <Copy className="w-4 h-4 ml-2" />
                </Button>
              )}
              <Button onClick={onCopyFormula} variant={"ghost"} size={"sm"}>
                Script <Download className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}
        </div>
        <ScrollArea className="h-[95%]">
          {products?.map((product, i) => (
            <ProductCart
              onRefetch={() => setProduct(product)}
              isLoading={isLoading}
              allProducts={allProducts}
              product={product}
              key={product.main_id + i}
              onDelete={onDelete}
              onChange={onChange}
            />
          ))}
        </ScrollArea>
      </div>
    </Container>
  );
};

export default ProductsList;
