import { getUsers } from "@/api/requests";
import { useLocation } from "react-router-dom";

interface AuthProps {
  setEmailErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  setPasswordErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  setNameErrorMessage?: React.Dispatch<React.SetStateAction<string>>;
}
export const useAuth = ({
  setEmailErrorMessage,
  setPasswordErrorMessage,
  setNameErrorMessage,
}: AuthProps) => {
  const location = useLocation();
  const validateLogin = async (
    email: string,
    password: string,
    name?: string
  ): Promise<boolean> => {
    const errors: Record<string, string> = {};

    if (!email) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }
    if (location.pathname === "/register" && !name) {
      errors.name = "Name is required";
    }

    if (errors.email) {
      setEmailErrorMessage(errors.email);
    }
    if (errors.password) {
      setPasswordErrorMessage(errors.password);
    }
    if (errors.name && setNameErrorMessage) {
      setNameErrorMessage(errors.name);
    }

    if (Object.keys(errors).length > 0) {
      return false;
    }

    try {
      const response = await getUsers();
      const user = response.find((user) => user.email === email);
      if (location.pathname === "/login") {
        if (!user?.email) {
          setEmailErrorMessage("Email not found");
          setPasswordErrorMessage("");
          return false;
        }
        if (user.password !== password) {
          setPasswordErrorMessage("Incorrect password");
          setEmailErrorMessage("");
          return false;
        }
      } else if (location.pathname === "/register") {
        if (user?.email) {
          setEmailErrorMessage("Email is already registered");
          setPasswordErrorMessage("");
          return false;
        }
      }
    } catch (error) {
      setEmailErrorMessage("An error occurred while validating credentials");
      return false;
    }
    return true;
  };

  return { validateLogin };
};
