import { getUsers, login, register } from "@/api/requests";
import type { LoginData, RegisterData } from "@/api/types";
import { useUserStore } from "@/stores/useUserStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useRegister = () => {
  const [registerForm, setRegisterForm] = useState({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });
  const [errorMessages, setErrorMessages] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const { setUser, addTokens } = useUserStore();
  const navigate = useNavigate();
  const onRegister = async (e: React.FormEvent) => {
    if (e) e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!registerForm.email) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerForm.email)) newErrors.email = "Please enter a valid email address";
    if (!registerForm.password) newErrors.password = "Password is required";
    else if (registerForm.password.length < 8) newErrors.password = "Password must be at least 8 characters";
    if (!registerForm.avatar) newErrors.avatar = "Avatar is required";
    if (!registerForm.name) newErrors.name = "Name is required";

    if (Object.keys(newErrors).length > 0) {
      setErrorMessages(newErrors);
      return;
    }
    setIsLoading(true);
    try {
      const response = await getUsers();
      const user = response.find((user) => user.email === registerForm.email);

      if (user?.email) {
        setErrorMessages({ email: "Email is already registered" });
        return;
      }

      const registerPayload: RegisterData = {
        email: registerForm.email,
        name: registerForm.name,
        password: registerForm.password,
        avatar: registerForm.avatar,
        role: "customer",
      };
      const loginPayload: LoginData = {
        email: registerForm.email,
        password: registerForm.password,
      };
      const registerResponse = await register(registerPayload);
      const loginResponse = await login(loginPayload);

      setUser(registerResponse);
      addTokens(loginResponse.access_token, loginResponse.refresh_token);

      navigate("/");
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    registerForm,
    setRegisterForm,
    errorMessages,
    isLoading,
    onRegister,
  };
};

export default useRegister;
