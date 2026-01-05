import type { ProductResponse } from "@/api/types";
import { Ellipsis } from "lucide-react";
import ActiveModal from "../modals/ActiveModal";
import { useState } from "react";
import EditProductModal from "../modals/EditProductModal";

interface TableRowProps {
  product: ProductResponse;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}
const TableRow = ({ product, isOpen, onToggle, onClose }: TableRowProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  if (!product.id) return;
  return (
    <div className="flex items-center justify-between w-full h-fit border-b-2 border-b-(--border) py-4 px-4 relative">
      <div className="flex items-center gap-2 w-full h-full ">
        <img src={product.images[0]} className="size-13 object-cover rounded-2xl"></img>
        <span>{product.title}</span>
      </div>
      <span className="w-full text-center ">{product.category.name}</span>
      <span className="w-full text-center ">{product.price} $</span>
      <button onClick={onToggle} className="cursor-pointer ">
        <Ellipsis className="w-[62.23px]" />
      </button>
      {isOpen && <ActiveModal setIsEditModalOpen={setIsEditModalOpen} productId={product.id} onClose={onClose} />}
      {isEditModalOpen && <EditProductModal product={product} setIsEditModalOpen={setIsEditModalOpen} />}
    </div>
  );
};

export default TableRow;
