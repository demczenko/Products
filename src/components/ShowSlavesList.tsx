import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { PropsWithChildren } from "react";
import { ConfigureSlaves } from "./ConfigureSlaves";
import { TSlave } from "@/types/Product";

const ShowSlavesList = ({
  children,
  onOpenChange,
  open,
  main_id,
  slaves,
}: PropsWithChildren & {
  open: boolean;
  onOpenChange: () => void;
  main_id: string;
  slaves: TSlave[];
}) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader className="mb-4 flex flex-row justify-between">
          <div>
            <SheetTitle>Slaves of {main_id}</SheetTitle>
            <SheetDescription>
              Explore slaves of master id: {main_id}
            </SheetDescription>
          </div>
          <ConfigureSlaves slaves={slaves} />
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  );
};

export default ShowSlavesList;
