import { Route, Routes, useNavigate } from "react-router-dom";
import { router } from "./router";
import NavbarLayout from "./layouts/NavbarLayout";
import useAuthGuard from "./hooks/useAuthGuard";
import globalRouter from "./utils/globalRouter";

function App() {
  const navigate = useNavigate();
  globalRouter.navigate = navigate;
  useAuthGuard();
  return (
    <>
      <Routes>
        {router.map((route, index) => {
          return (
            <Route
              key={index}
              path={route.path}
              element={<NavbarLayout showNavbar={route.showNavbar}>{route.element}</NavbarLayout>}
            />
          );
        })}
      </Routes>
    </>
  );
}

export default App;
