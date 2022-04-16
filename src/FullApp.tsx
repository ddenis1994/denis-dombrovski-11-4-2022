import { Route, Routes } from "react-router-dom";
// import { animated, useTransition } from "react-spring";
import App from "./App";
import Favorites from "./features/favorites/Favorites";
import { HomePage } from "./features/homePage/HomePage";

export const FullApp: React.FC = () => {
  // const first = useContext(second)

  // const location = useLocation();
  // const transitions = useTransition(location, {
  //   from: { opacity: 0 },
  //   enter: { opacity: 1 },
  //   leave: { opacity: 0 },
  // });

  // return transitions((props, item) => (
  //   <animated.div style={props}>
      return <Routes >
        <Route path="/" element={<App />}>
          <Route path="" element={<HomePage />} />
          <Route path="home" element={<HomePage />} />
          <Route path="favorites" element={<Favorites />} />
        </Route>
      </Routes>
    // </animated.div>
  // ));
};
