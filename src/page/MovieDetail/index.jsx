import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { groupBy } from "lodash";
import BannerDetail from "../../components/MediaDetail/BanerDetail";
import ActorList from "../../components/MediaDetail/ActorList";
import RelatedMediaList from "../../components/MediaDetail/RelatedMediaList";
import MovieInformation from "../../components/MediaDetail/MovieInformation";
import SimilarMedia from "../../components/MediaDetail/SimilarMedia";
import WatchProviders from "../../components/MediaDetail/WatchProviders";
import Reviews from "../../components/MediaDetail/Reviews";
import useFetch from "../../hooks";

function MovieDetail() {
  const { id } = useParams();
  // const [movieInfor, setMovieInfor] = useState({});
  // const [isLoading, setIsLoading] = useState(true);
  const [movieRelated, setMovieRelated] = useState([]);

  // useEffect(() => {
  //   const fetchApi = async () => {
  //     //FIXME: Do vẫn thiếu dữ liệu, cần thêm dữ liệu thì dùng append_to_respones
  //     const response = await fetch(
  //       `https://api.themoviedb.org/3/movie/${id}?append_to_response=release_dates,credits`,
  //       {
  //         method: "GET",
  //         headers: {
  //           accept: "application/json",
  //           Authorization:
  //               `Bearer ${import.meta.env.VITE_API_TOKEN} `,
  //         },
  //       }
  //     );
  //     const data = await response.json();
  //     setMovieInfor(data);
  //     setIsLoading(false);
  //   };
  //   fetchApi();
  // }, [id]);

  const { data: movieInfor, isLoading } = useFetch({
    url: `https://api.themoviedb.org/3/movie/${id}?append_to_response=release_dates,credits,videos`,
    token: `eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MzA0OTc0ZTUzYThjNDljNmVkZjhlNDgxZTZkYzk1MiIsIm5iZiI6MTc0Mjg1MTY5Mi4xNzYsInN1YiI6IjY3ZTFjZTZjNDQwZjMxMWFjZTc1YzBhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.71hTyCz9haS-kSKIMhY1_IZAF0fXVLoxhx5lWee_lj0 `,
  });
  console.table(movieInfor);

  useEffect(() => {
    const fetchApi = async () => {
      //FIXME: Do vẫn thiếu dữ liệu, cần thêm dữ liệu thì dùng append_to_respones
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/recommendations`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN} `,
          },
        },
      );
      const data = await response.json();
      setMovieRelated(data.results.slice(0, 12));
    };
    fetchApi();
  }, [id]);

  if (movieInfor) {
    console.log(movieInfor);
  }
  const serTifiCation = (
    (movieInfor.release_dates?.results || []).find(
      (results) => results.iso_3166_1 === "US",
    )?.release_dates || []
  ).find((release_dates) => release_dates.certification)?.certification;

  const crew = (movieInfor.credits?.crew || []).filter((crew) =>
    ["Director", "Writer"].includes(crew.job),
  );

  console.log(
    (movieInfor.credits?.crew || []).filter((crew) =>
      ["Director", "Writer"].includes(crew.job),
    ),
  );
  const groupCrew = groupBy(crew, "job");

  console.log(crew);
  console.log(movieInfor);
  const traierVideoKey =
    (movieInfor.videos?.results || []).find((type) => type.type === "Trailer")
      ?.key || [];
  console.log(traierVideoKey);
  return (
    <>
      {!isLoading ? (
        <>
          <BannerDetail
            serTifiCation={serTifiCation}
            groupCrew={groupCrew}
            movieInfor={movieInfor}
            title={movieInfor.title}
            vote_average={movieInfor.vote_average}
            overview={movieInfor.overview}
            genres={movieInfor.genres}
            release_date={movieInfor.release_date}
            poster_path={movieInfor.poster_path}
            backdrop_path={movieInfor.backdrop_path}
            traierVideoKey={traierVideoKey}
          />
          <div className="bg-black text-[1.2vw]">
            <div className="mx-auto flex max-w-screen-xl gap-6 bg-black px-6 py-10 text-white">
              <div className="flex-2">
                <ActorList movieInfor={movieInfor.credits?.cast || []} />
                <RelatedMediaList movieRelated={movieRelated} />

                {/* Watch Providers */}
                <div className="mt-8">
                  <WatchProviders mediaId={id} mediaType="movie" />
                </div>

                {/* Reviews */}
                <div className="mt-8">
                  <Reviews mediaId={id} mediaType="movie" />
                </div>
              </div>
              <div className="flex-1">
                <MovieInformation movieInfor={movieInfor} />
              </div>
            </div>

            {/* Similar Movies and Recommendations */}
            <SimilarMedia mediaId={id} mediaType="movie" />
          </div>
        </>
      ) : (
        <div className="flex h-screen w-full items-center justify-center">
          <div className="spinner-border inline-block h-16 w-16 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
        </div>
      )}
    </>
  );
}

export default MovieDetail;
