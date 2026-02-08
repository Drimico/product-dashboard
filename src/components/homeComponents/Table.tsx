import { useProductsStore } from "@/stores/useProductsStore";
import TableRow from "./TableRow";
import CustomPagination from "../core/CustomPagination";
import { useState } from "react";
import TableTop from "./TableTop";
import noItemsFound from "../../assets/images/noItemsFound.png";
const Table = () => {
  const { products } = useProductsStore();
  const [openProductId, setOpenProductId] = useState<number | null>(null);

  return (
    <div className="w-450 h-230 text-xl text-(--text) font-raleway bg-(--bg) flex flex-col items-center justify-between px-4 shadow-(--shadow-l) p-5 relative">
      <div className="w-full h-fit flex flex-col">
        <TableTop />
        <div className="flex items-center justify-between w-full h-fit py-4 px-4 relative bg-(--bg-light) shadow-(--shadow-s) rounded-xl font-bold">
          <span className="w-full">Product Name</span>
          <span className="w-full text-center ">Category</span>
          <span className="w-full text-center ">Price</span>
          <span className="">Action</span>
        </div>
        {products.map((product) => (
          <TableRow
            key={product.id}
            product={product}
            isOpen={openProductId === product.id}
            onToggle={() => setOpenProductId((prev) => (prev === product.id ? null : product.id))}
            onClose={() => setOpenProductId(null)}
          />
        ))}
      </div>
      {products.length === 0 && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <img src={noItemsFound} alt="" />
        </div>
      )}
      <CustomPagination />
    </div>
  );
};

export default Table;
