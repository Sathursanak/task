import React from "react";
import { SearchIcon } from "@heroicons/react/outline"; // Importing the Search icon from Heroicons

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="relative mb-6">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search tasks..."
        className="w-full py-2 px-4 rounded-md border-2 border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-600"
      />
      <SearchIcon className="h-6 w-6 text-teal-500 absolute right-3 top-1/2 transform -translate-y-1/2" />
    </div>
  );
};

export default SearchBar;
