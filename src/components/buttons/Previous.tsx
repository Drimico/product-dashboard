import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Previous = () => {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate("/")} className="flex text-2xl cursor-pointer group">
      <ChevronLeft size={30} className="animate-bounce-left" />
      <span>Previous</span>
    </button>
  );
};

export default Previous;
