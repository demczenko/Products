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
import { Loader, Settings } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "./ui/input";

type TProductCard = {
  onSubmit: (ev: FormData, cb: () => void) => void;
  isLoading: boolean;
  setServer: (value: string) => void;
  server: string;
};

const ProductCard = ({ server, setServer, isLoading, onSubmit }: TProductCard) => {
  const [firstPart, setFirstPart] = useState("");
  const [secondPart, setSecondPart] = useState("");
  const [isTableName, setTableName] = useState<boolean>(false);
  const { toast } = useToast();

  return (
    <Container align="items-center">
      <div className="px-2">
        <Card className="min-w-[380px]">
          <CardHeader>
            <div className="flex justify-between">
              <CardTitle>Create products</CardTitle>
              <Popover>
                <PopoverTrigger asChild>
                  <Button size={"sm"} variant="outline">
                    <Settings className="w-4 h-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-fit space-y-2 flex flex-col">
                  <p className="text-gray-800 font-semibold text-sm m-0">Selected: </p>
                  <p className="text-gray-800 font-semibold text-xs mt-0">{server}</p>
                  <Input
                  placeholder="enter custom endpoint"
                    className="text-left text-xs h-9"
                    onChange={(ev) => setServer(ev.target.value)}
                  />
                  <Button
                    size={"sm"}
                    className={`text-left block`}
                    variant={"outline"}
                    onClick={() => setServer("https://beliani.us:7777")}>
                    Beliani Us
                  </Button>
                </PopoverContent>
              </Popover>
            </div>
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
                setFirstPart("");
                setSecondPart("");
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
                <div className="flex flex-col gap-2">
                  <div className="mb-2">
                    <h2 className="text-xl font-semibold tracking-tight">
                      Master src
                    </h2>
                    {firstPart && firstPart && (
                      <p className="text-xs text-neutral-600 font-semibold">
                        {firstPart}
                        {secondPart}
                      </p>
                    )}
                  </div>
                  <FormField
                    placeholder="First part of the src link"
                    type={"url"}
                    id="src_origin"
                    isRequired={true}
                    name="src_origin"
                    title="Origin Src"
                    onChange={(ev) => setFirstPart(ev.target.value)}
                  />
                  <FormField
                    placeholder="Second part of the src link"
                    type={"text"}
                    id="src_name"
                    isRequired={true}
                    name="src_name"
                    title="Name Src"
                    onChange={(ev) => setSecondPart(ev.target.value)}
                  />
                </div>
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
                <Button className="w-full" disabled={isLoading} type="submit">
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
