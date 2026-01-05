import { updateUserData } from "@/api/requests";
import { useUserStore } from "@/stores/useUserStore";
import React, { useState } from "react";

interface UseUpdateUserProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const useUpdateUser = ({ setIsOpen }: UseUpdateUserProps) => {
  const { user, setUser } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const [userForm, setUserForm] = useState({
    name: user?.name ?? "",
    email: user?.email ?? "",
    password: user?.password ?? "",
    avatar: user?.avatar ?? "",
  });
  const [errorMessages, setErrorMessages] = useState<Record<string, string>>({});

  const updateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    if (!user) return;

    const newErrors: Record<string, string> = {};

    if (!userForm.email) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userForm.email)) newErrors.email = "Please enter a valid email address";
    if (!userForm.password) newErrors.password = "Password is required";
    else if (userForm.password.length < 8) newErrors.password = "Password must be at least 8 characters";
    if (location.pathname === "/register" && !userForm.name) newErrors.name = "Name is required";

    if (Object.keys(newErrors).length > 0) {
      setErrorMessages(newErrors);
      return;
    }
    setIsLoading(true);
    try {
      const payload = {
        name: userForm.name,
        email: userForm.email,
        password: userForm.password,
        avatar: userForm.avatar,
      };

      const response = await updateUserData(payload, user?.id);
      setUser(response);
      setIsOpen(false);
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    userForm,
    setUserForm,
    errorMessages,
    updateUser,
  };
};

export default useUpdateUser;
