import { TProduct, TSlave } from "@/types/Product";
import { Button } from "./ui/button";
import { Edit, RefreshCwIcon, X } from "lucide-react";
import { useState } from "react";
import HandleProductChange from "./HandleProductChange";
import ShowSlavesList from "./ShowSlavesList";
import SlavesList from "./SlavesList";

type TProductCart = {
  product: TProduct;
  onDelete: (id: string) => void;
  onChange: (product: TProduct) => void;
  allProducts: TSlave[];
  isLoading: boolean;
  onRefetch: () => void;
};

const ProductCart = ({
  allProducts,
  isLoading,
  product,
  onChange,
  onDelete,
  onRefetch,
}: TProductCart) => {
  const [open, setIsOpen] = useState(false);
  const [isSlavesOpen, setIsSlavesOpen] = useState(false);

  const slaves = allProducts.filter((item) => item.main_id === product.main_id);

  return (
    <div className="flex gap-2 w-full border-2 group mb-2 overflow-hidden rounded-lg bg-white max-h-48">
      <div className="md:w-[20%] w-[35%] overflow-hidden">
        <img src={product.src} className="object-cover w-full h-full" />
      </div>
      <div className="p-2 grow flex justify-between items-start">
        <div>
          <div className="space-y-1">
            <Button
              disabled={isLoading}
              onClick={() => setIsSlavesOpen(true)}
              className="text-xl font-semibold tracking-tight"
              variant={"ghost"}>
              Product {product.main_id}
            </Button>
          </div>
          {product.table_name && (
            <div className="space-y-1">
              <h2 className="text-sm font-semibold tracking-tight">
                Table name {product.table_name}
              </h2>
            </div>
          )}
        </div>
        <div className="opacity-0 flex flex-col gap-2 transition-opacity group-hover:opacity-100">
          <Button
            disabled={isLoading}
            size={"sm"}
            variant={"destructive"}
            onClick={() => onDelete(product.main_id)}>
            <X className="w-4 h-4" />
          </Button>
          <Button
            disabled={isLoading}
            size={"sm"}
            variant={"secondary"}
            onClick={() => setIsOpen(true)}>
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            disabled={
              isLoading ||
              allProducts.find((item) => item.main_id === product.main_id)
                ? true
                : false
            }
            size={"sm"}
            variant={"secondary"}
            onClick={() => onRefetch()}>
            <RefreshCwIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <ShowSlavesList
        slaves={slaves}
        main_id={product.main_id}
        open={isSlavesOpen}
        onOpenChange={setIsSlavesOpen as () => void}
        children={<SlavesList slaves={slaves} />}
      />
      <HandleProductChange
        open={open}
        onOpenChange={setIsOpen as () => void}
        onChange={onChange}
        product={product}
      />
    </div>
  );
};

export default ProductCart;
