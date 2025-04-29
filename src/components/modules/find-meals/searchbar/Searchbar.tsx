"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`${pathname}?searchTerm=${searchTerm}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex gap-2 items-center max-w-md p-2 bg-white border rounded shadow-sm"
    >
      <input
        type="text"
        placeholder="Search meals..."
        className="flex-1 p-2 border rounded"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        type="submit"
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
