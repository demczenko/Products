import { TProduct } from "@/types/Product";
import { Button } from "./ui/button";
import { X } from "lucide-react";

const Product = ({
  main_id,
  src,
  table_name,
  onDelete,
}: TProduct & { onDelete: (id: string) => void }) => {

  return (
    <div className="flex gap-2 w-full border-2 group mb-2 overflow-hidden rounded-lg bg-slate-100 min-h-24">
      <div className="md:w-[20%] w-[35%] overflow-hidden">
        <img src={src} className="object-cover w-full h-full" />
      </div>
      <div className="p-2 grow flex justify-between items-start">
        <div>
          <div className="space-y-1">
            <h2 className="text-xl font-semibold tracking-tight">
              Product {main_id}
            </h2>
          </div>
          {table_name && (
            <div className="space-y-1">
              <h2 className="text-sm font-semibold tracking-tight">
                Table name {table_name}
              </h2>
            </div>
          )}
        </div>
        <div className="opacity-0 transition-opacity group-hover:opacity-100">
          <Button
            size={"sm"}
            variant={"destructive"}
            onClick={() => onDelete(main_id)}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Product;
