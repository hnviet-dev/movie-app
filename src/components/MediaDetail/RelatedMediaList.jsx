import MovieCard from "../MovieCard";

function RelatedMediaList({ movieRelated }) {
  console.log(movieRelated);
  return (
    <>
      <div className="mt-6">
        <p className="mb-4 text-[1.2vw] font-bold">More Like This</p>
        <div>
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 lg:gap-6">
            {movieRelated.map((movie, index) => (
              <MovieCard
                key={`movie.id+${index}`}
                movie={movie}
                type="relatedMovie"
              ></MovieCard>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default RelatedMediaList;
