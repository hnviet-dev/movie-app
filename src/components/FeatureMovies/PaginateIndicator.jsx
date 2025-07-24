function PaginateIndicator(prop) {
  const { setActiveMovieId, moviePopular, activeMovieId } = prop;

  return (
    <>
      <div className="absolute right-8 bottom-[10%]">
        <ul className="flex gap-1.5">
          {moviePopular.map((movie) => (
            <li
              className={`w-5 h-1 ${
                movie.id === activeMovieId ? "bg-red-600" : " bg-slate-600"
              } cursor-pointer `}
              onClick={() => setActiveMovieId(movie.id)}
              key={movie.id}
            ></li>
          ))}
          {/* <li className="w-4 h-1 bg-red-600 cursor-spointer"></li> */}
          {/* <li className="w-4 h-1 bg-slate-600 cursor-pointer"></li>
    <li className="w-4 h-1 bg-slate-600 cursor-pointer"></li> */}
        </ul>
      </div>
    </>
  );
}

export default PaginateIndicator;
