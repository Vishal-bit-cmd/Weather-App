import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import CityDetails from "./pages/CityDetails";

export default function App() {
    return (
        <Router >
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/city/:id" element={<CityDetails />} />
            </Routes>
        </Router>
    );
}
