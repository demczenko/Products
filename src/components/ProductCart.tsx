import { TProduct } from "@/types/Product";
import { Button } from "./ui/button";
import { Edit, X } from "lucide-react";
import { useState } from "react";
import HandleProductChange from "./HandleProductChange";

type TProductCart = {
  product: TProduct;
  onDelete: (id: string) => void;
  onChange: (product: TProduct) => void;
};

const ProductCart = ({ product, onChange, onDelete }: TProductCart) => {
  const [open, setIsOpen] = useState(false);

  return (
    <div className="flex gap-2 w-full border-2 group mb-2 overflow-hidden rounded-lg bg-slate-100 max-h-48">
      <div className="md:w-[20%] w-[35%] overflow-hidden">
        <img src={product.src} className="object-cover w-full h-full" />
      </div>
      <div className="p-2 grow flex justify-between items-start">
        <div>
          <div className="space-y-1">
            <h2 className="text-xl font-semibold tracking-tight">
              Product {product.main_id}
            </h2>
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
            size={"sm"}
            variant={"destructive"}
            onClick={() => onDelete(product.main_id)}>
            <X className="w-4 h-4" />
          </Button>
          <Button size={"sm"} variant={"secondary"} onClick={() => setIsOpen(true)}>
            <Edit className="w-4 h-4" />
          </Button>
        </div>
      </div>
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
