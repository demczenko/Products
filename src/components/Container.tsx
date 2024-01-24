import { PropsWithChildren } from "react";

const Container = ({
  children,
  align,
}: PropsWithChildren & { align: "items-center" | "items-start" }) => {
  return (
    <div
      className={`w-full h-full flex justify-center ${align}`}>
      {children}
    </div>
  );
};

export default Container;
