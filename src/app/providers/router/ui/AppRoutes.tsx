import { Routes, Route, useLocation } from "react-router-dom";
import { pages } from "../config/constants";

const AppRoutes = () => {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      {pages.map((item) => (
        <Route key={item.id} path={item.path} element={<item.component />} />
      ))}
    </Routes>
  );
};

export default AppRoutes;
