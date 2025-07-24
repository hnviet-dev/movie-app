import { useState, useEffect } from "react";

function WatchProviders({ mediaId, mediaType = "movie" }) {
  const [providers, setProviders] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!mediaId) return;

    const fetchWatchProviders = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/${mediaType}/${mediaId}/watch/providers`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
            },
          },
        );

        const data = await response.json();
        setProviders(data.results);
      } catch (error) {
        console.error("Error fetching watch providers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWatchProviders();
  }, [mediaId, mediaType]);

  if (loading) {
    return (
      <div className="rounded-lg bg-gray-900 p-6">
        <div className="text-white">Loading watch providers...</div>
      </div>
    );
  }

  if (!providers) return null;

  // Prioritize some regions (you can modify this based on your audience)
  const priorityRegions = ["US", "GB", "CA", "AU", "DE", "FR", "JP", "VN"];
  const availableRegions = Object.keys(providers);
  const sortedRegions = priorityRegions
    .filter((region) => availableRegions.includes(region))
    .concat(
      availableRegions.filter((region) => !priorityRegions.includes(region)),
    );

  const renderProviders = (providersList, title) => {
    if (!providersList || providersList.length === 0) return null;

    return (
      <div className="mb-4">
        <h4 className="mb-2 text-sm font-semibold text-gray-300">{title}</h4>
        <div className="flex flex-wrap gap-2">
          {providersList.map((provider) => (
            <div
              key={provider.provider_id}
              className="flex items-center rounded-lg bg-gray-800 p-2 transition-colors hover:bg-gray-700"
              title={provider.provider_name}
            >
              <img
                src={`https://image.tmdb.org/t/p/w45${provider.logo_path}`}
                alt={provider.provider_name}
                className="h-8 w-8 rounded"
              />
              <span className="ml-2 text-xs text-white">
                {provider.provider_name}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="rounded-lg bg-gray-900 p-6">
      <h3 className="mb-4 text-xl font-bold text-white">Where to Watch</h3>

      {sortedRegions.slice(0, 3).map((region) => {
        const regionData = providers[region];
        if (!regionData) return null;

        return (
          <div key={region} className="mb-6 last:mb-0">
            <h4 className="mb-3 text-lg font-semibold text-white">
              {region === "US"
                ? "United States"
                : region === "GB"
                  ? "United Kingdom"
                  : region === "VN"
                    ? "Vietnam"
                    : region}
            </h4>

            {renderProviders(regionData.flatrate, "Stream")}
            {renderProviders(regionData.rent, "Rent")}
            {renderProviders(regionData.buy, "Buy")}

            {regionData.link && (
              <div className="mt-3">
                <a
                  href={regionData.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-400 underline hover:text-blue-300"
                ></a>
              </div>
            )}
          </div>
        );
      })}

      {sortedRegions.length === 0 && (
        <div className="py-4 text-center text-gray-400">
          No streaming information available
        </div>
      )}
    </div>
  );
}

export default WatchProviders;
