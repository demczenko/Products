import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TSlave } from "@/types/Product";
import { Toggle } from "./ui/toggle";

export function ConfigureSlaves({ slaves }: { slaves: TSlave[] }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Configure slaves</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Image</h4>
            <p className="text-sm text-muted-foreground">
              Change image for selected country
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              {slaves.map((slave, i) => (
                <Toggle variant={"outline"} key={i} aria-label="Toggle italic">
                  <p>{slave.country}</p>
                </Toggle>
              ))}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
