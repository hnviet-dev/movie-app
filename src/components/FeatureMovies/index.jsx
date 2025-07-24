import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PaginateIndicator from "./PaginateIndicator";
import Movie from "./Movie";
import { useEffect, useState } from "react";
// import useFetch from "../../hooks";

//eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MzA0OTc0ZTUzYThjNDljNmVkZjhlNDgxZTZkYzk1MiIsIm5iZiI6MTc0Mjg1MTY5Mi4xNzYsInN1YiI6IjY3ZTFjZTZjNDQwZjMxMWFjZTc1YzBhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.71hTyCz9haS-kSKIMhY1_IZAF0fXVLoxhx5lWee_lj0
//6304974e53a8c49c6edf8e481e6dc952
function FeatureMovies() {
  const [moviePopular, setMoviePopular] = useState([]);
  const [activeMovieId, setActiveMovieId] = useState();
  // https:api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc
  useEffect(() => {
    const fetchAPI = async () => {
      const res = await fetch(
        "https://api.themoviedb.org/3/movie/popular?include_video=true",
        {
          method: "GET",

          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MzA0OTc0ZTUzYThjNDljNmVkZjhlNDgxZTZkYzk1MiIsIm5iZiI6MTc0Mjg1MTY5Mi4xNzYsInN1YiI6IjY3ZTFjZTZjNDQwZjMxMWFjZTc1YzBhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.71hTyCz9haS-kSKIMhY1_IZAF0fXVLoxhx5lWee_lj0",
          },
        },
      );
      const data = await res.json();
      // tach ra lay 4 cai,nó sẽ lấy trước thằng số 4, 0 1 2 3
      const moviePupularId = data.results.slice(1, 10);
      setMoviePopular(moviePupularId);
      setActiveMovieId(moviePupularId[0].id);
    };
    fetchAPI();
  }, []);
  console.log(moviePopular);
  // const { data: dataMoviePupularId } = useFetch({
  //   url: `https://api.themoviedb.org/3/movie/popular`,
  //   method: "GET",
  //   headers: {
  //     Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN} `,
  //   },
  // });
  // const moviePopular = (dataMoviePupularId.results || []).slice(14, 21);
  // useEffect(() => {
  //   if (moviePopular[0]?.id) {
  //     setActiveMovieId(moviePopular[0].id);
  //   }

  // }, [JSON.stringify(moviePopular)]);

  // console.log(moviePopular);
  // console.log(activeMovieId);
  return (
    <>
      <div className="relative">
        {moviePopular
          .filter((movie) => movie.id === activeMovieId)
          .map((movie) => (
            <Movie key={movie.id} moviePopular={movie} />
          ))}
        {/* {moviePopular.map((movie) => (33
          <Movie key={movie.id} moviePopular={movie} />
        ))} */}
        <PaginateIndicator
          setActiveMovieId={setActiveMovieId}
          moviePopular={moviePopular}
          activeMovieId={activeMovieId}
        />
      </div>
    </>
  );
}

export default FeatureMovies;
