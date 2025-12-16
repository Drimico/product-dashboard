import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";

export const router = [
  {
    path: "/",
    element: <Home />,
    showNavbar: true,
  },
  {
    path: "/login",
    element: <Login />,
    showNavbar: false,
  },
  {
    path: "/register",
    element: <Register />,
    showNavbar: false,
  },
  {
    path: "/profile",
    element: <Profile />,
    showNavbar: false,
  }
];
