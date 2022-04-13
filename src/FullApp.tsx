import { Route, Routes } from "react-router-dom";
import App from "./App";
import Favorites from "./features/favorites/Favorites";
import { HomePage } from "./features/homePage/HomePage";

export const FullApp: React.FC = () => (
  <Routes>
    <Route path="/" element={<App />}>
      <Route path="" element={<HomePage />} />
      <Route path="home" element={<HomePage />} />
      <Route path="favorites" element={<Favorites />} />
    </Route>
  </Routes>
);
