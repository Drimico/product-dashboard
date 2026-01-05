import { useProductsStore } from "@/stores/useProductsStore";
import TableRow from "./TableRow";
import CustomPagination from "../core/CustomPagination";
import { useState } from "react";
import TableTop from "./TableTop";

const Table = () => {
  const { products } = useProductsStore();
  const [openProductId, setOpenProductId] = useState<number | null>(null);

  return (
    <div className="w-450 h-230 text-xl text-(--text) font-raleway bg-(--bg) flex flex-col items-center justify-between px-4 shadow-(--shadow-l) p-5 ">
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

      <CustomPagination />
    </div>
  );
};

export default Table;
