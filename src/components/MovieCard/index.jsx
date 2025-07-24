import { NavLink } from "react-router-dom";
import CircularProgressBar from "../CicularProgressBar";

function MovieCard({ movie, activeTabId, type }) {
  return (
    <>
      <NavLink
        to={
          (movie.media_type || activeTabId) === "tv"
            ? `/tv/${movie.id}`
            : `/movie/${movie.id}`
        }
        className={"rounded-lg border border-slate-600 2xl:text-xl"}
      >
        <div className="relative">
          {(movie.media_type || activeTabId) === "tv" && (
            <p className="absolute top-2 right-0 z-10 rounded-l-lg bg-red-500 px-1 py-1 text-sm font-medium text-white">
              {" "}
              TV Show
            </p>
          )}
          <div className="relative aspect-[2/3] overflow-hidden">
            <img
              loading="lazy"
              className="absolute h-full w-full rounded-lg object-cover"
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                  : "../../../public/2x3.svg"
              }
              alt=""
            />
          </div>

          <div
            className={`relative -top-[1.5vw] px-4 text-[1.2vw] ${
              type === "relatedMovie" && "xl:text-xl"
            } `}
          >
            <CircularProgressBar
              xl:size={`${type === "relatedMovie" && "2"}`}
              percent={Math.round(movie.vote_average * 10)}
            />
            <p className="mt-2 truncate font-bold 2xl:text-xl">
              {movie.title || movie.name}
            </p>

            <p className="text-slate-300 2xl:text-xl">
              {movie.release_date || movie.first_air_date}
            </p>
          </div>
        </div>
      </NavLink>
    </>
  );
}

export default MovieCard;
