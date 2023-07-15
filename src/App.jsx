import { BrowserRouter, Link } from "react-router-dom";
import { Routes, Route } from "react-router";
import { useState, useEffect } from "react";
import Homepage from "./pages/Homepage";
// import Starship from "./pages/Starship";
import StarshipDetails from "./pages/StarshipDetails";
import Search from "./pages/Search";
import PageStarship from "./pages/PageStarship";

export default function App() {
  const [search, setSearch] = useState("");
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const searchText = () => {
    setSearch(inputValue);
    setInputValue("");
  };

  return (
    <div className="transition-all min-w-fit min-h-screen font-mono font-bold bg-gradient-to-r from-sky-900 to-rose-900">
      <BrowserRouter>
        <nav className="min-w-fit transition-all flex sm:flex-row flex-col justify-between items-center p-3 py-4">
          <div className="flex">
            <Link
              to="/"
              className="text-white hover:bg-slate-800 hover:scale-110 transition-all mb-4 sm:mb-0"
            >
              <h3 className="w-20 sm:w-48 sm:text-2xl text-lg border-2 border-white rounded-md text-center h-10 flex justify-center items-center">
                Home
              </h3>
            </Link>
            <Link
              to="/starship/pages/1"
              className="ml-4 text-white hover:bg-slate-800 hover:scale-110 transition-all"
            >
              <h3 className="w-fit md:w-48 text-2xl border-2 border-white rounded-md text-center h-10 hidden md:flex justify-center items-center">
                Starship
              </h3>
            </Link>
          </div>
          <div className="flex space-x-2 ml-0 md:ml-4">
            <input
              type="text"
              value={inputValue}
              placeholder="Search Your Starship!"
              className="border-2 border-white rounded-xl p-3 h-10 w-40 sm:w-60 placeholder:text-[11px] sm:placeholder:text-base"
              onChange={handleInputChange}
            />
            <Link to="/search">
              <button
                onClick={searchText}
                className="border-2 border-white rounded-xl p-3 h-10 flex items-center hover:bg-slate-800 hover:scale-110 transition-all"
              >
                <h3 className="text-white">Search</h3>
              </button>
            </Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Homepage />} />
          {/* <Route path="/starship" element={<Starship />} /> */}
          <Route path="/starship/:shipId" element={<StarshipDetails />} />
          <Route path="/starship/pages/:pageId" element={<PageStarship />} />
          <Route path="/search" element={<Search search={search} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
