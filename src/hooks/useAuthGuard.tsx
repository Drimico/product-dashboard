import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useUserStore } from "@/stores/useUserStore";

const useAuthGuard = () => {
  const authPages = ["/"];
  const navigate = useNavigate();
  const location = useLocation();
  const { tokens } = useUserStore();
  useEffect(() => {
    const token = tokens.accessToken;
    if (!token && authPages.includes(location.pathname)) {
      navigate("/login");
    }
  }, [location.pathname, tokens.accessToken]);
  return null;
};

export default useAuthGuard;
