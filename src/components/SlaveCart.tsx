import { TSlave } from "@/types/Product";

type TSlaveCart = {
  slave: TSlave;
};

const SlaveCart = ({ slave }: TSlaveCart) => {
  return (
    <div
      className={`flex gap-2 w-full border-2 group mb-2 overflow-hidden rounded-lg bg-white max-h-48 `}>
      <div className="md:w-[20%] w-[35%] overflow-hidden">
        <img src={slave.src} className="object-cover w-full h-full" />
      </div>
      <div className="p-2 grow flex justify-between items-start">
        <div>
          <div className="space-y-1">
            <h2
              className={`text-xl font-semibold tracking-tight hover:underline`}>
              {slave.country.toLocaleLowerCase() === "chde" ? (
                <a href={slave.href} target="_blank">
                  Master {slave.name}
                </a>
              ) : (
                <a href={slave.href} target="_blank">
                  Slave {slave.name}
                </a>
              )}
            </h2>
          </div>
          <div className="space-y-1">
            <h2 className="text-sm font-semibold tracking-tight">
              Low price: {slave.lowPrice}
            </h2>
          </div>
          <div className="space-y-1">
            <h2 className="text-sm font-semibold tracking-tight">
              High price: {slave.highPrice}
            </h2>
          </div>
          <div className="space-y-1">
            <h2 className="text-sm font-semibold tracking-tight">
              Country: {slave.country}
            </h2>
          </div>
          {slave.table_name && (
            <div className="space-y-1">
              <h2 className="text-sm font-semibold tracking-tight">
                Table name {slave.table_name}
              </h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SlaveCart;
