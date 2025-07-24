// import { NavLink } from "react-router-dom";
// import CircularProgressBar from "./CircularProgressBar";

// function MovieCard({movie,activeTabId}) {
//     console.log(movie)
//     console.log(movie.media_type)
//     return ( <>
//     <NavLink to={ movie.media_type==='movie'?`/movie/${movie.id}`:`/tv/${movie.id}`} className={ " border  border-slate-600 rounded-lg "}>
//             <div className=" relative">
//     {(movie.media_type||activeTabId)==='tv' && <p className="absolute top-2 right-0 bg-red-500 text-white px-1 py-1 rounded-l-lg text-sm font-medium"> TV Show</p>}
//         <img className="rounded-lg" src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt="" />

//         <div className="px-4 text-[1.2vw] relative -top-[1.5vw] xl:text-xl">
//           <CircularProgressBar percent={ Math.round( movie.vote_average*10)}/>
//             <p className="font-bold mt-2 truncate">{movie.title||movie.name}</p>
//             <p className="text-slate-300">{movie.release_date||movie.first_air_date}</p>
//         </div>
//     </div>
//     </NavLink>

//     </> );
// }

// export default MovieCard;
