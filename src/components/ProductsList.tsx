import { Copy, Download } from "lucide-react";
import Container from "./Container";
import ProductCart from "./ProductCart";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { TProduct } from "@/types/Product";
import { useToast } from "./ui/use-toast";

const ProductsList = ({
  products,
  onDelete,
  onChange,
  allProducts,
}: {
  allProducts: TProduct[];
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

  const onCopyFormula = async () => {
    const response = await fetch("formula.js");
    const data = await response.blob();
    const download = URL.createObjectURL(data);

    const a = document.createElement("a");
    a.href = download;
    a.setAttribute("download", "parse");
    a.click();

    toast({
      title: "Copied successfully",
      description: "Function has been successfully download",
    });
  };

  return (
    <Container align="items-start">
      <div className="w-full h-full bg-slate-200 p-2">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-semibold tracking-tight mb-2">
            Products
          </h2>
          {products.length > 0 && (
            <div className="flex items-center gap-2">
              <Button onClick={onCopy} variant={"ghost"} size={"sm"}>
                Main products <Copy className="w-4 h-4 ml-2" />
              </Button>
              <Button onClick={onCopyFormula} variant={"ghost"} size={"sm"}>
                Script <Download className="w-4 h-4 ml-2" />
              </Button>
              {allProducts.length > 0 && (
                <Button onClick={onCopyAll} variant={"ghost"} size={"sm"}>
                  All products
                  <Copy className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          )}
        </div>
        <ScrollArea className="h-[98%]">
          {products?.map((product, i) => (
            <ProductCart
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
