import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { PropsWithChildren } from "react";
import { ConfigureSlaves } from "./ConfigureSlaves";

const ShowSlavesList = ({
  children,
  onOpenChange,
  open,
  main_id,
}: PropsWithChildren & {
  open: boolean;
  onOpenChange: () => void;
  main_id: string;
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
          <ConfigureSlaves />
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  );
};

export default ShowSlavesList;
