import { useState, useEffect } from "react";
import MovieCard from "../MovieCard";

function MultiSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(false);

  const tabs = [
    { id: "all", name: "All", endpoint: "multi" },
    { id: "movie", name: "Movies", endpoint: "movie" },
    { id: "tv", name: "TV Shows", endpoint: "tv" },
    { id: "person", name: "People", endpoint: "person" },
  ];

  const handleSearch = async (query, endpoint = "multi") => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/${endpoint}?query=${encodeURIComponent(query)}&page=1`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
          },
        },
      );

      const data = await response.json();
      setSearchResults(data.results?.slice(0, 20) || []);
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (searchQuery) {
        const currentTab = tabs.find((tab) => tab.id === activeTab);
        handleSearch(searchQuery, currentTab?.endpoint || "multi");
      }
    }, 500); // Delay 500ms để tránh gọi API quá nhiều

    return () => clearTimeout(delayedSearch);
  }, [searchQuery, activeTab]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (searchQuery) {
      const currentTab = tabs.find((tab) => tab.id === tabId);
      handleSearch(searchQuery, currentTab?.endpoint || "multi");
    }
  };

  const renderSearchResult = (item) => {
    if (item.media_type === "person" || activeTab === "person") {
      return (
        <div
          key={item.id}
          className="rounded-lg bg-gray-800 p-4 transition-colors hover:bg-gray-700"
        >
          <img
            src={
              item.profile_path
                ? `https://image.tmdb.org/t/p/w185${item.profile_path}`
                : "/public/276x350.svg"
            }
            alt={item.name}
            className="mb-2 h-48 w-full rounded object-cover"
          />
          <h3 className="text-sm font-semibold text-white">{item.name}</h3>
          <p className="text-xs text-gray-400">{item.known_for_department}</p>
          {item.known_for && (
            <p className="mt-1 text-xs text-gray-300">
              Known for:{" "}
              {item.known_for
                .map((movie) => movie.title || movie.name)
                .join(", ")}
            </p>
          )}
        </div>
      );
    }

    return (
      <MovieCard
        key={item.id}
        movie={item}
        activeTabId={item.media_type || activeTab}
      />
    );
  };

  return (
    <div className="bg-transparent px-8 py-10 text-white">
      <div className="mb-6">
        {/* Search Input */}
        <div className="mb-6">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search for movies, TV shows, or people..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-gray-600 bg-gray-800 py-4 pr-4 pl-12 text-lg text-white placeholder-gray-400 transition-all duration-200 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 focus:outline-none"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex w-fit space-x-1 rounded-lg bg-gray-800 p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`cursor-pointer rounded-md px-4 py-2 font-medium transition-all duration-200 ${
                tab.id === activeTab
                  ? "bg-red-600 text-white shadow-lg"
                  : "text-gray-400 hover:bg-gray-700 hover:text-white"
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-10">
          <div className="text-white">Searching...</div>
        </div>
      )}

      {/* Search Results */}
      {searchResults.length > 0 && !loading && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
          {searchResults.map((item) => renderSearchResult(item))}
        </div>
      )}

      {/* No Results */}
      {searchQuery && searchResults.length === 0 && !loading && (
        <div className="py-10 text-center text-gray-400">
          No results found for "{searchQuery}"
        </div>
      )}

      {/* Initial State */}
      {!searchQuery && (
        <div className="py-10 text-center text-gray-400">
          Start typing to search for movies, TV shows, or people...
        </div>
      )}
    </div>
  );
}

export default MultiSearch;
