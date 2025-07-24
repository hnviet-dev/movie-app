import { useEffect, useState } from "react";
import MovieCard from "../MovieCard";

function MediaList({ title, tabs }) {
  // const TABSID = [
  //   { id: "all", name: "All" },
  //   { id: "movie", name: "Movie" },
  //   { id: "tv", name: "TV Show" },
  // ];
  const [mediaList, setMediaList] = useState();
  const [activeTabId, setActiveTabId] = useState(tabs[0].id);

  useEffect(() => {
    const url = tabs.find((tabid) => tabid.id === activeTabId)?.url || "";

    const fetchAPI = async () => {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN} `,
        },
      });

      const data = await res.json();

      setMediaList(data.results.slice(0, 12));
    };
    fetchAPI();
  }, [activeTabId, tabs]);
  console.log(mediaList);

  return (
    <>
      <div className="bg-black px-8 py-10 text-[1.2vw] text-white xl:text-xl">
        <div className="mb-6 flex items-center gap-4">
          <p className="text-[1.4vw] font-bold"> {title}</p>

          <ul className="flex rounded border border-white 2xl:text-xl">
            {tabs.map((tabid) => (
              <li
                key={tabid.id}
                onClick={() => setActiveTabId(tabid.id)}
                className={`cursor-pointer rounded px-2 py-1 ${
                  tabid.id === activeTabId ? "bg-white text-black" : ""
                } `}
              >
                {tabid.name}{" "}
              </li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-6 lg:gap-6">
          {mediaList &&
            mediaList.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                activeTabId={activeTabId}
              />
            ))}
        </div>
      </div>
    </>
  );
}

export default MediaList;
