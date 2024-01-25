import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";
import FormField from "./FormField";
import { TProduct } from "@/types/Product";

type THandleProductChange = {
  open: boolean;
  onOpenChange: () => void;
  product: TProduct;
  onChange: (product: TProduct) => void;
};

const HandleProductChange = ({
  product,
  open,
  onOpenChange,
  onChange
}: THandleProductChange) => {
  const { toast } = useToast();

  const onSubmit = (form: FormData) => {
    let new_product = {...product} as TProduct;
    for (const [key, value] of form.entries()) {
      let k = key as keyof TProduct;
      let v = value as string;
      new_product[k] = v;
    }

    onChange(new_product)
    toast({
      title: "Form submission",
      description: "Product image successfully updated.",
    });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit product src</SheetTitle>
          <SheetDescription>
            Make changes to product here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <form
          onSubmit={(ev) => {
            ev.preventDefault();

            const form = new FormData(ev.target as HTMLFormElement);

            for (const [_, value] of form.entries()) {
              if ((value as string).trim().length === 0) {
                toast({
                  variant: "destructive",
                  title: "Form validation",
                  description: "Fulfill all required fields",
                });
                return;
              }
            }

            onSubmit(form);
          }}>
          <div className="grid gap-4 py-4">
            <FormField
              value={product.src}
              placeholder="Src of product image"
              type={"text"}
              id="src"
              isRequired={true}
              name="src"
              title="Product Src"
            />
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button className="w-full" size={"sm"} type="submit">Save changes</Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default HandleProductChange;
