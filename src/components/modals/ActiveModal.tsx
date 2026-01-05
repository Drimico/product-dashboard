import Delete from "../buttons/Delete";

interface ActiveModalProps {
  onClose: () => void;
  productId: number;
  setIsEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const ActiveModal = ({ productId, onClose, setIsEditModalOpen }: ActiveModalProps) => {
  return (
    <>
      <div onClick={onClose} className="fixed inset-0 z-10" />
      <div className="flex flex-col items-center justify-center w-30 h-42 bg-(--bg) font-raleway text-xl text-(--text) px-2 shadow-(--shadow-l) border-t-white/50 border-t absolute right-0 top-[80%] z-20 ">
        <div className="w-full h-14  border-b-2 border-b-(--border) py-2 ">
          <button
            onClick={() => {
              setIsEditModalOpen((prev) => !prev);
              onClose();
            }}
            className="w-full h-full hover:bg-(--info) cursor-pointer transition-colors duration-200 ease-in-out"
          >
            Edit
          </button>
        </div>
        <div className="w-full h-14 border-b-2 border-b-(--border) py-2">
          <Delete productId={productId} />
        </div>
        <div className="w-full h-14 cursor-pointer py-2">
          <button
            className="w-full h-full hover:bg-(--highlight) cursor-pointer transition-colors duration-200 ease-in-out"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default ActiveModal;
