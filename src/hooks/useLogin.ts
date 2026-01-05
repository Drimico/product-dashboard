import { getLogUser, getUsers, login } from "@/api/requests";
import type { LoginData } from "@/api/types";
import { useUserStore } from "@/stores/useUserStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [errorMessages, setErrorMessages] = useState<Record<string, string>>({});
  const { deleteTokens, addTokens, setUser } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const onLogin = async (e: React.FormEvent) => {
    if (e) e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!loginForm.email) newErrors.email = "Email is required";
    if (!loginForm.password) newErrors.password = "Password is required";
    if (!loginForm.email) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginForm.email)) newErrors.email = "Please enter a valid email address";
    if (!loginForm.password) newErrors.password = "Password is required";
    else if (loginForm.password.length < 8) newErrors.password = "Password must be at least 8 characters";

    if (Object.keys(newErrors).length > 0) {
      setErrorMessages(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      const response = await getUsers();
      const user = response.find((user) => user.email === loginForm.email);
      deleteTokens();
      if (!user?.email) {
        setErrorMessages({ email: "Email not found" });
        return;
      }
      if (user.password !== loginForm.password) {
        setErrorMessages({ password: "Incorrect password" });
        return;
      }

      const payload: LoginData = {
        email: loginForm.email,
        password: loginForm.password,
      };

      const data = await login(payload);
      addTokens(data.access_token, data.refresh_token);
      const logUser = await getLogUser();
      setUser(logUser);
      navigate("/");
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    loginForm,
    setLoginForm,
    errorMessages,
    isLoading,
    onLogin,
  };
};

export default useLogin;
