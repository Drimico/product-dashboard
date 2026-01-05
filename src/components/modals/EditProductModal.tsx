import type { ProductResponse } from "@/api/types";
import ImagePlaceholder from "../core/ImagePlaceholder";
import { X } from "lucide-react";
import useEditProduct from "@/hooks/useEditProduct";

interface EditProductModalProps {
  product: ProductResponse;
  setIsEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const EditProductModal = ({ product, setIsEditModalOpen }: EditProductModalProps) => {
  const { productForm, setProductForm, errorMessages, onEditProduct } = useEditProduct({ product, setIsEditModalOpen });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleImageChange = (url: string) => setProductForm((prev) => ({ ...prev, image: url }));

  return (
    <>
      <div className="fixed inset-0 z-10 backdrop-blur-xl" />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onEditProduct();
        }}
        className="fixed flex items-center justify-between right-[33%] top-[30%] w-200 h-120 px-20 py-5 bg-(--bg) shadow-(--shadow-l) z-20 "
      >
        <div className="flex flex-col justify-around h-full w-75">
          <div className="flex flex-col gap-2">
            <span className="text-2xl">Product Name:</span>
            <input
              name="name"
              type="text"
              value={productForm.name}
              onChange={handleInputChange}
              className="w-full h-fit p-2 bg-(--bg-light) focus:outline-none text-xl shadow-(--shadow-s) border-t-2 border-t-white/90 rounded-xl"
            />
            {errorMessages.name !== "" && <span className="text-red-500">{errorMessages.name}</span>}
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-2xl">Category:</span>
            <input
              name="category"
              type="text"
              value={productForm.category}
              onChange={handleInputChange}
              className="w-full h-fit p-2 bg-(--bg-light) focus:outline-none text-xl shadow-(--shadow-s) border-t-2 border-t-white/90 rounded-xl"
            />
            {errorMessages.category !== "" && <span className="text-red-500">{errorMessages.category}</span>}
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-2xl">Price:</span>
            <input
              name="price"
              type="text"
              value={productForm.price}
              onChange={handleInputChange}
              className="w-full h-fit p-2 bg-(--bg-light) focus:outline-none text-xl shadow-(--shadow-s) border-t-2 border-t-white/90 rounded-xl"
            />
            {errorMessages.price !== "" && <span className="text-red-500">{errorMessages.price}</span>}
          </div>
          <button
            type="submit"
            className="bg-(--highlight) hover:bg-(--highlight-hover) hover:text-white/90 w-30 h-10 shadow-(--shadow-m) rounded-xl cursor-pointer text-2xl relative transition-colors ease-in-out duration-200"
          >
            Save
          </button>
        </div>
        <div className="relative w-60 h-60">
          <ImagePlaceholder initialImage={productForm.image} onImageUpload={handleImageChange} />
          {!productForm.image && <span className="text-red-500 absolute top-[120%] left-[18%]">{errorMessages.image}</span>}
        </div>
        <button
          onClick={() => setIsEditModalOpen((prev) => !prev)}
          type="button"
          className="cursor-pointer w-fit h-fit transition-transform duration-300 hover:rotate-90 absolute top-[8%] right-[5%]"
        >
          <X size={30} />
        </button>
      </form>
    </>
  );
};

export default EditProductModal;
