import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import { useLocation, useNavigate } from "react-router-dom";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    // console.log(location.pathname);

    if (location.pathname === "/" || location.pathname.includes("collection")) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location]);
  // Handle search submit
  // The query string — this is extra data attached to the URL
  // /collection?q=shirt
  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/collection?q=${search}`);
    }
  };
  return showSearch && visible ? (
    <div className="border-t border-b bg-gray-50 text-center">
      <form
        className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2 "
        onSubmit={handleSearch}
      >
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 outLine-none bg-inherit text-sm"
          type="text"
          placeholder="Search"
        />
        <button type="submit">
          <img className="w-4" src={assets.search_icon} alt="" />
        </button>
      </form>
      <img
        onClick={() => setShowSearch(false)}
        className="inline w-3 cursor-pointer"
        src={assets.cross_icon}
        alt=""
      />
    </div>
  ) : null;
};

export default SearchBar;
