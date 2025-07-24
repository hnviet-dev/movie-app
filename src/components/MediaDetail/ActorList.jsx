import { useState } from "react";
import { NavLink } from "react-router-dom";
import Movie from "../FeatureMovies/Movie";

function ActorList({ movieInfor }) {
  console.log(movieInfor);
  const [isShowMore, setIsShowMore] = useState(false);

  const currentActor = movieInfor.slice(0, isShowMore ? movieInfor.length : 8);
  {
    isShowMore ? currentActor : movieInfor;
  }
  return (
    <>
      <p className="mb-4 text-[1.2vw] font-bold">Actor</p>

      <div className="grid grid-cols-3 gap-4 text-[1.2vw] sm:grid-cols-4 2xl:text-xl">
        {currentActor.map((cast) => (
          <NavLink key={cast.id} to={`/people/${cast.id}`}>
            <div className="rounded-lg border border-slate-300 bg-black text-white shadow-sm">
              <div className="aspect-[138/175]">
                <img
                  loading="lazy"
                  className="h-full w-full rounded-lg object-cover"
                  src={
                    cast.profile_path
                      ? `https://media.themoviedb.org/t/p/w276_and_h350_face${cast.profile_path} `
                      : "../../../public/276x350.svg"
                  }
                  alt=""
                />
              </div>
              <div></div>
              <div className="p-3">
                <p className="font-bold">
                  {cast.name ? cast.name : cast.title}
                </p>
                <p className="">
                  {cast.character || (cast.roles && cast.roles[0].character)}
                </p>

                <p className="text-[1.2vw] text-gray-200 2xl:text-xl">
                  {cast.roles?.[0]?.episode_count
                    ? `${cast.roles[0].episode_count} Episode`
                    : ""}
                </p>
              </div>
            </div>
          </NavLink>
        ))}
      </div>

      <p
        className="m-1 cursor-pointer text-[1.5vw] hover:text-sky-700 xl:text-xl"
        onClick={() => setIsShowMore(!isShowMore)}
      >
        {isShowMore ? "Show Less" : "Show More"}
      </p>
    </>
  );
}

export default ActorList;
