import { TSlave } from "@/types/Product";
import Container from "./Container";
import SlaveCart from "./SlaveCart";
import { ScrollArea } from "./ui/scroll-area";

const SlavesList = ({ slaves }: { slaves: TSlave[] }) => {
  return (
    <Container align="items-start">
      <div className="w-full h-full bg-slate-200 p-2">
        <ScrollArea className="h-[98%]">
          {slaves.map((slave, i) => (
            <SlaveCart slave={slave} key={slave.main_id + i} />
          ))}
        </ScrollArea>
      </div>
    </Container>
  );
};

export default SlavesList;
