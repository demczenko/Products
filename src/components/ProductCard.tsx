import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Switch } from "./ui/switch";
import FormField from "./FormField";
import Container from "./Container";
import { Loader } from "lucide-react";

type TProductCard = {
  onSubmit: (ev: FormData, cb: () => void) => void;
  isLoading: boolean;
};

const ProductCard = ({ isLoading, onSubmit }: TProductCard) => {
  const [isTableName, setTableName] = useState<boolean>(false);
  const { toast } = useToast();

  return (
    <Container align="items-center">
      <div className="px-2">
        <Card className="max-w-[480px]">
          <CardHeader>
            <CardTitle>Create products</CardTitle>
            <CardDescription>
              Get all product for your newsletter in minutes
            </CardDescription>
          </CardHeader>
          <CardContent>
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

                onSubmit(form, () => (ev.target as HTMLFormElement).reset());
              }}>
              <div className="grid w-full items-center gap-4">
                <FormField
                  placeholder="Id of product"
                  type={"text"}
                  id="main_id"
                  isRequired={true}
                  name="main_id"
                  title="Master Id"
                />
                <FormField
                  placeholder="Src of product image"
                  type={"text"}
                  id="src"
                  isRequired={true}
                  name="src"
                  title="Product Src"
                />
                <div className="flex items-center space-x-2">
                  <Switch
                    onClick={() => setTableName(!isTableName)}
                    id="table_name"
                  />
                  <Label htmlFor="table_name">Add table name </Label>
                </div>
                {isTableName && (
                  <FormField
                    placeholder="Table name of product"
                    type={"text"}
                    id="table_name"
                    isRequired={true}
                    name="table_name"
                    title="Table name"
                  />
                )}
              </div>
              <CardFooter className="px-0 pt-6 pb-0 flex justify-between">
                <Button disabled={isLoading} type="submit">
                  {isLoading ? (
                    <Loader className="animate-spin"></Loader>
                  ) : (
                    "Create product"
                  )}
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
};

export default ProductCard;
