import { useState } from "react";
import CircularProgressBar from "../CicularProgressBar";

function SeasonList({seasons}) {
    console.log(seasons)
const [isShowMore,setShowMore]=useState(false);
   const currentSeason=seasons.slice(0,isShowMore?seasons.length:4)


  return (
    <>
      <div className="mt-6  text-[1.4vw] space-y-4 xl:text-xl">
        <p className="font-bold text-[1.4vw] mb-4">SeasonList</p>
        {currentSeason.map(seasons=> 
                <div key={seasons.id} className="flex gap-4 rounded-lg border backdrop-blur-lg p-3">
          <div className="flex-1  rounded-lg aspect-[2/3]">
            <img
            loading="lazy"
              className="rounded-lg w-full h-full overflow-hidden object-cover"
              src={ seasons.poster_path? `https://image.tmdb.org/t/p/original${seasons.poster_path}`:"../../../public/2x3.svg"}
              alt=""
            />
          </div>
          <div className="space-y-1 flex-1">
            <p className="font-bold text-[1.5vw]">{seasons.name}</p>
            <div className="flex items-center">
              <p className="font-bold mr-1">Rating</p>
              <CircularProgressBar percent={Math.round(seasons.vote_average*10)} size={2.5} strokeWidth={0.3}/>
            </div>
            <p>
              <span className="font-bold ">Release Date </span>
              <span>{seasons.air_date}</span>
            </p>
            <p>{seasons.episode_count} Episodes</p>
            <p>
              {seasons.overview}
            </p>
          </div>
        </div>
        )}
    
      </div >
      <p      className="cursor-pointer m-1 text-[1.5vw] hover:text-sky-700 xl:text-xl " onClick={()=>setShowMore(!isShowMore)}>Show More Season</p>
    </>
  );
}

export default SeasonList;
