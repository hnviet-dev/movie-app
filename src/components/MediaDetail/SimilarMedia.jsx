import { useState, useEffect } from "react";
import MovieCard from "../MovieCard";

function SimilarMedia({ mediaId, mediaType = "movie" }) {
  const [similarMedia, setSimilarMedia] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [activeTab, setActiveTab] = useState("similar");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!mediaId) return;

    const fetchSimilarAndRecommendations = async () => {
      setLoading(true);
      try {
        // Fetch Similar Media
        const similarResponse = await fetch(
          `https://api.themoviedb.org/3/${mediaType}/${mediaId}/similar?page=1`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
            },
          },
        );
        const similarData = await similarResponse.json();
        setSimilarMedia(similarData.results?.slice(0, 12) || []);

        // Fetch Recommendations
        const recommendationsResponse = await fetch(
          `https://api.themoviedb.org/3/${mediaType}/${mediaId}/recommendations?page=1`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
            },
          },
        );
        const recommendationsData = await recommendationsResponse.json();
        setRecommendations(recommendationsData.results?.slice(0, 12) || []);
      } catch (error) {
        console.error("Error fetching similar media:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSimilarAndRecommendations();
  }, [mediaId, mediaType]);

  const tabs = [
    { id: "similar", name: "Similar", data: similarMedia },
    { id: "recommendations", name: "Recommendations", data: recommendations },
  ];

  const currentData = tabs.find((tab) => tab.id === activeTab)?.data || [];

  if (loading) {
    return (
      <div className="bg-black px-8 py-10">
        <div className="text-center text-white">Loading...</div>
      </div>
    );
  }

  if (similarMedia.length === 0 && recommendations.length === 0) {
    return null;
  }

  return (
    <div className="bg-black px-8 py-10">
      <div className="mb-6">
        <div className="mb-4 flex items-center gap-4">
          <h2 className="text-2xl font-bold text-white">More Like This</h2>

          <ul className="flex rounded border border-white">
            {tabs.map((tab) => (
              <li
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`cursor-pointer rounded px-4 py-2 text-white ${
                  tab.id === activeTab
                    ? "bg-white text-black"
                    : "hover:bg-gray-700"
                }`}
              >
                {tab.name} ({tab.data.length})
              </li>
            ))}
          </ul>
        </div>
      </div>

      {currentData.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {currentData.map((item) => (
            <MovieCard key={item.id} movie={item} activeTabId={mediaType} />
          ))}
        </div>
      ) : (
        <div className="py-10 text-center text-gray-400">
          No {activeTab} found
        </div>
      )}
    </div>
  );
}

export default SimilarMedia;
