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
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";

type TProductCard = {
  onSubmit: (ev: FormData, cb: () => void) => void;
  isLoading: boolean;
};

const ProductCard = ({ isLoading, onSubmit }: TProductCard) => {
  const [selectedServer, setDefaultServer] = useState<string>(
    "https://upload.pictureserver.net/static/2024/"
  );
  const [isUniq, setUniq] = useState<boolean>(false);
  const { toast } = useToast();

  return (
    <Container align="items-center">
      <div className="px-2">
        <Card className="min-w-[380px]">
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
                form.append("is_unique", JSON.stringify(isUniq));
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
                  <div className="mb-2 flex items-center gap-2">
                    <h2 className="text-xl font-semibold tracking-tight grow shrink-0">
                      Master src
                    </h2>
                    <Select
                      onValueChange={(server: string) =>
                        setDefaultServer(server)
                      }>
                      <SelectTrigger>Select server</SelectTrigger>
                      <SelectContent>
                        <SelectItem
                          value={
                            "https://upload.pictureserver.net/static/2024/"
                          }>
                          Picture server
                        </SelectItem>
                        <SelectItem
                          value={"https://beliani.info/newsletter/2022/"}>
                          Beliani info
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <FormField
                    placeholder="First part of the src link"
                    type={"url"}
                    id="src_origin"
                    isRequired={true}
                    value={selectedServer}
                    name="src_origin"
                    title="Origin Src"
                    onChange={(ev) => setDefaultServer(ev.target.value)}
                  />
                  <FormField
                    placeholder="Second part of the src link"
                    type={"text"}
                    id="src_name"
                    isRequired={true}
                    name="src_name"
                    title="Name Src"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch onClick={() => setUniq(!isUniq)} id="is_unique" />
                  <Label htmlFor="is_unique">Make unique</Label>
                </div>
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
