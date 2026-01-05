import { Plus, X } from "lucide-react";
import { useRef, useState } from "react";
import { fileUpload } from "../../api/requests";
import { Spinner } from "../ui/spinner";

interface ImagePlaceholderProps {
  onImageUpload?: (url: string) => void;

  initialImage?: string;
}

const ImagePlaceholder = ({ onImageUpload, initialImage }: ImagePlaceholderProps = {}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadErrorMessage, setUploadErrorMessage] = useState("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>(initialImage || "");
  const [isUploading, setIsUploading] = useState(false);
  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    setUploadErrorMessage("");

    try {
      const response = await fileUpload(file);
      const proxiedUrl = `https://corsproxy.io/?${encodeURIComponent(response.location)}`;
      setUploadedImageUrl(proxiedUrl);
      setUploadErrorMessage("");
      onImageUpload?.(proxiedUrl);
    } catch {
      setUploadErrorMessage("Image upload failed. Please try again.");
      setUploadedImageUrl("");
    } finally {
      setIsUploading(false);
    }
  };
  const deleteImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setUploadedImageUrl("");

    onImageUpload?.("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  return (
    <>
      {uploadedImageUrl ? (
        <div className="w-full h-full flex flex-col relative">
          <img src={uploadedImageUrl} alt="" className="w-full h-full object-cover rounded-full" />
          {uploadErrorMessage && <span className="text-(--light-danger)">{uploadErrorMessage}</span>}
          <button
            type="button"
            onClick={(e) => deleteImage(e)}
            className="w-fit h-fit p-1  absolute -bottom-[5%] -right-[5%] rounded-full bg-(--light-danger) hover:bg-(--danger) group cursor-pointer "
          >
            <X className="group-hover:rotate-90 transition-transform duration-300 ease-in-out text-(--info)" />
          </button>
        </div>
      ) : isUploading ? (
        <div className="flex justify-center items-center w-full h-full">
          <Spinner />
        </div>
      ) : (
        <label className="w-full h-full">
          <div className="border-10 border-dashed border-(--border-muted) flex justify-center items-center cursor-pointer text-(--text-muted) hover:text-(--text) hover:border-(--border) group w-full h-full rounded-full">
            <Plus size={100} className="transition-transform duration-300 group-hover:rotate-90 cursor-pointer" />
            <input
              type="file"
              id="image"
              multiple
              name="image"
              className="opacity-0 w-0 h-0"
              accept="image/*"
              ref={fileInputRef}
              onChange={uploadImage}
            />
          </div>
        </label>
      )}
    </>
  );
};
export default ImagePlaceholder;
