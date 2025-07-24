import { faPlay } from "@fortawesome/free-solid-svg-icons";
import CircularProgressBar from "../CicularProgressBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import ModalProvider, { ModalContext } from "../../context/ModalProvider";

function BannerDetail({
  serTifiCation,
  genres,
  overview,
  traierVideoKey,
  vote_average,
  poster_path,
  release_date,
  backdrop_path,
  title,
  groupCrew,
}) {
  const { setContent, setIsShowing } = useContext(ModalContext);

  return (
    <>
      <div className="sa relative overflow-hidden text-white shadow-amber-300">
        <div className="absolute inset-0 brightness-20">
          <img
            className="w-full"
            src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
            alt=""
          />
        </div>

        <div className="lg:max-w-x relative top-0 mx-auto flex max-w-screen-xl gap-6 p-4 px-6 text-white sm:py-10 lg:gap-8">
          <div className="flex-1">
            <img
              className=""
              src={`https://image.tmdb.org/t/p/original${poster_path}`}
              alt=""
            />
          </div>

          <div className="flex-2 text-[1.2vw] xl:text-xl">
            <p className="mb-2 text-[2vw] font-bold">{title}</p>
            <div className="flex items-center gap-4">
              <span className="border p-1 text-gray-400">{serTifiCation}</span>
              <p>{release_date}</p>
              <p>{(genres || []).map((genres) => genres.name).join(", ")}</p>
            </div>
            <div className="mt-4 flex items-center gap-4">
              <div className="">
                <CircularProgressBar percent={Math.round(vote_average * 10)} />
              </div>
              <button
                className="text-red-300"
                onClick={() => {
                  setIsShowing(true);
                  setContent(
                    <iframe
                      src={`https://www.youtube.com/embed/${traierVideoKey}`}
                      title="YouTube video player"
                      frameBorder=""
                      className="aspect-video w-[60vw] rounded border"
                    ></iframe>,
                  );
                }}
              >
                <FontAwesomeIcon icon={faPlay} />
                Trailer
              </button>
            </div>
            <div className="mt-4">
              <p className="mb-2 text-[1.3vw] font-bold">Overview</p>
              <p>{overview}</p>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {Object.keys(groupCrew).map((job) => (
                <div key={job}>
                  <p>{job}</p>
                  <p>{groupCrew[job].map((crew) => crew.name).join(",")}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BannerDetail;
