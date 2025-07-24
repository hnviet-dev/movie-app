import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PaginateIndicator from "./PaginateIndicator";
import { NavLink } from "react-router-dom";
function Movie({moviePopular}) {
  console.log(moviePopular)
  const {backdrop_path, title, release_date, overview,id} = moviePopular;

  return (
    <>
      <img
        src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
        alt=""
        className="aspect-video w-full object-cover brightness-70"
      />
      
      <div className="absolute bottom-[30%] left-8 w-1/2 sm:w-1/3  text-white">
        <p className="font-bold sm:text-[4vw]">{title}</p>
        <div>
          <p className="text-gray-400 border border-gray-400 inline-block p-1 mb-1">
            PG13
          </p>
          <p className="text-[1.2vw]">{release_date}</p>
        </div>
        <div className="hidden sm:block text-[1.2vw] mt-4">
          <p className="font-bold mb-2">Overview</p>
          <p>{overview}</p>
        </div>
        <div className="mt-4">
          <button className="bg-white text-black py-2 px-4 rounded text-[12px] lg:text-lg mr-2">
            {" "}
            <FontAwesomeIcon icon={faPlay} /> Trailer
          </button>
          <NavLink to={`./movie/${id}`}>
              <button className="bg-slate-300/40 text-white py-2 px-4 rounded text-[12px] lg:text-lg mr-2">
            View Detail
          </button>
          </NavLink>
        
        </div>
      </div>
    </>
  );
}

export default Movie;
