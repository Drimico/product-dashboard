import useCreateProduct from "@/hooks/useCreateProduct";
import { X } from "lucide-react";
import ImagePlaceholder from "../core/ImagePlaceholder";

interface AddProductModalProps {
  setIsAddProductModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddProductModal = ({ setIsAddProductModalOpen }: AddProductModalProps) => {
  const { isLoading, createdProduct, setCreatedProduct, errorMessages, onCreateProduct } = useCreateProduct({
    setIsAddProductModalOpen,
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCreatedProduct((prev) => ({ ...prev, [name]: value }));
  };
  const handleProductImageUpload = (url: string) => setCreatedProduct((prev) => ({ ...prev, images: [url] }));

  const handleCategoryImageUpload = (url: string) => setCreatedProduct((prev) => ({ ...prev, categoryImage: url }));
  return (
    <>
      <div className="fixed inset-0 z-10 backdrop-blur-xl" />
      <div className="fixed inset-0 flex w-screen h-screen items-center justify-center z-20 ">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onCreateProduct();
          }}
          className="flex items-center justify-between w-200 h-180 px-20 py-5 bg-(--bg) shadow-(--shadow-l) relative"
        >
          <div className="flex flex-col justify-between h-full w-75">
            <div className="flex flex-col gap-2">
              <span className="text-2xl">Product Name:</span>
              <input
                name="title"
                type="text"
                value={createdProduct.title}
                onChange={handleInputChange}
                className="w-full h-fit p-2 bg-(--bg-light) focus:outline-none text-xl shadow-(--shadow-s) border-t-2 border-t-white/90 rounded-xl"
              />
              {errorMessages.name !== "" && <span className="text-red-500">{errorMessages.name}</span>}
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-2xl">Category:</span>
              <input
                name="categoryName"
                type="text"
                value={createdProduct.categoryName}
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
                value={createdProduct.price}
                onChange={handleInputChange}
                className="w-full h-fit p-2 bg-(--bg-light) focus:outline-none text-xl shadow-(--shadow-s) border-t-2 border-t-white/90 rounded-xl"
              />
              {errorMessages.price !== "" && <span className="text-red-500">{errorMessages.price}</span>}
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-2xl">Description:</span>
              <textarea
                name="description"
                value={createdProduct.description}
                onChange={handleInputChange}
                className="w-full h-50 p-2 bg-(--bg-light) focus:outline-none text-xl shadow-(--shadow-s) border-t-2 border-t-white/90 rounded-xl resize-none align-text-top scrollbar-thin"
              />
            </div>
            {errorMessages.description !== "" && <span className="text-red-500">{errorMessages.description}</span>}
            <button
              disabled={isLoading}
              type="submit"
              className="bg-(--highlight) hover:bg-(--highlight-hover) hover:text-white/90 w-30 h-10 shadow-(--shadow-m) rounded-xl cursor-pointer text-2xl relative transition-colors ease-in-out duration-200"
            >
              Save
            </button>
          </div>
          <div className="flex flex-col h-full gap-10">
            <span className="text-2xl">Product Image:</span>
            <div className="relative w-60 h-60 flex flex-col gap-2">
              <ImagePlaceholder onImageUpload={handleProductImageUpload} />
              {!createdProduct.images[0] && <span className="text-red-500 absolute top-[108%] left-[18%]">{errorMessages.image}</span>}
            </div>
            <span className="text-2xl">Category Image:</span>
            <div className="relative w-60 h-60 flex flex-col gap-2">
              <ImagePlaceholder onImageUpload={handleCategoryImageUpload} />
              {!createdProduct.categoryImage && <span className="text-red-500 absolute top-[108%] left-[18%]">{errorMessages.image}</span>}
            </div>
          </div>
          <button
            onClick={() => setIsAddProductModalOpen((prev) => !prev)}
            type="button"
            className="cursor-pointer w-fit h-fit transition-transform duration-300 hover:rotate-90 absolute top-[3%] right-[3%]"
          >
            <X size={30} />
          </button>
        </form>
      </div>
    </>
  );
};

export default AddProductModal;
