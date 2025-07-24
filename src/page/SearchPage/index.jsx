import { useState } from "react";
import SearchForm from "../../components/SearchForm";
import MultiSearch from "../../components/MultiSearch";
import useFetch from "../../hooks";
import RelatedMediaList from "../../components/MediaDetail/RelatedMediaList";

function SearchPage() {
  const [activeSearchTab, setActiveSearchTab] = useState("quick");
  const [searchFormValue, setSearchFormValue] = useState({
    mediaType: "movie",
    genres: [],
    rating: "all",
  });

  const [minRating, maxRating] =
    searchFormValue.rating === "all"
      ? [0, 100]
      : searchFormValue.rating.split("-");

  const { data } = useFetch({
    url: `https://api.themoviedb.org/3/discover/${searchFormValue.mediaType}?with_genres=${searchFormValue.genres}&vote_average.gte=${minRating / 10}&vote_average.lte=${maxRating / 10}&sort_by=popularity.desc`,
    token: import.meta.env.VITE_API_TOKEN,
  });

  const searchTabs = [
    { id: "quick", name: "Quick Search", icon: "🔍" },
    { id: "advanced", name: "Advanced Search", icon: "⚙️" },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-4 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-4xl font-bold text-transparent">
            Search Movies & TV Shows
          </h1>
          <p className="text-lg text-gray-400">
            Discover your next favorite movie or TV show
          </p>
        </div>

        {/* Search Tabs */}
        <div className="mb-8">
          <div className="flex w-fit space-x-1 rounded-lg bg-gray-900 p-1">
            {searchTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSearchTab(tab.id)}
                className={`flex items-center gap-2 rounded-md px-6 py-3 font-medium transition-all duration-200 ${
                  activeSearchTab === tab.id
                    ? "bg-red-600 text-white shadow-lg"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <span>{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Search Content */}
        <div className="overflow-hidden rounded-lg bg-gray-900 shadow-xl">
          {activeSearchTab === "quick" ? (
            <div className="p-0">
              <MultiSearch />
            </div>
          ) : (
            <div className="p-8">
              <div className="flex gap-8">
                <div className="flex-1 rounded-lg bg-gray-800 p-6">
                  <h3 className="mb-4 text-xl font-semibold text-gray-200">
                    Filter Options
                  </h3>
                  <SearchForm setSearchFormValue={setSearchFormValue} />
                </div>
                <div className="flex-[2]">
                  <h3 className="mb-4 text-xl font-semibold text-gray-200">
                    Results ({data?.results?.length || 0})
                  </h3>
                  <RelatedMediaList movieRelated={data?.results || []} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
