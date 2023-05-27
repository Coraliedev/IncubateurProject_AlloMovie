import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

import Details from "../views/Details";
import Home from "../views/Home";
import NotFound from "../views/NotFound";
import Favorites from "../views/Favorites";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/details/:id" element={<Details />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRouter; 
