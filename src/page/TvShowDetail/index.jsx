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
import TvShowInformation from "../../components/MediaDetail/TvShowInformation";
import SeasonList from "../../components/SeasonsList";

function TvShowDetail() {
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

  const { data: TVInfo, isLoading } = useFetch({
    url: `https://api.themoviedb.org/3/tv/${id}?append_to_response=content_ratings,credits,aggregate_credits,videos`,
    token: `eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MzA0OTc0ZTUzYThjNDljNmVkZjhlNDgxZTZkYzk1MiIsIm5iZiI6MTc0Mjg1MTY5Mi4xNzYsInN1YiI6IjY3ZTFjZTZjNDQwZjMxMWFjZTc1YzBhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.71hTyCz9haS-kSKIMhY1_IZAF0fXVLoxhx5lWee_lj0 `,
  });

  useEffect(() => {
    const fetchApi = async () => {
      //FIXME: Do vẫn thiếu dữ liệu, cần thêm dữ liệu thì dùng append_to_respones
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${id}/recommendations`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN} `,
          },
        },
      );
      const data = await response.json();
      setMovieRelated(data.results?.slice(0, 12) || []);
    };
    fetchApi();
  }, [id]);

  const serTifiCation =
    (TVInfo.content_ratings?.results || []).find(
      (results) => results.iso_3166_1 === "US",
    )?.rating || [];

  // const crew = (TVInfo.credits?.crew || []).filter((crew) =>
  //   ["Director", "Writer"].includes(crew.job)
  // );

  // console.log(
  //   (TVInfo.credits?.crew || []).filter((crew) =>
  //     ["Director", "Writer"].includes(crew.job)
  //   )
  // );

  const Crew = TVInfo.aggregate_credits?.crew.filter((jobs) =>
    jobs.jobs?.some(
      (job) =>
        job.job === "Director" ||
        job.job === "Executive Producer" ||
        job.job === "Series Director",
    ),
  );

  // console.log(
  //   TVInfo.aggregate_credits?.crew?.map((jobs) => jobs.jobs?.map((j) => j.job))
  // );

  const groupCrew = groupBy(Crew, "jobs[0].job");
  console.log(TVInfo);
  const traierVideoKey =
    (TVInfo.videos?.results || []).find((type) => type.type === "Trailer")
      ?.key || [];
  console.log(traierVideoKey);
  return (
    <>
      {!isLoading ? (
        <>
          <BannerDetail
            serTifiCation={serTifiCation}
            groupCrew={groupCrew}
            movieInfor={TVInfo}
            title={TVInfo.name}
            vote_average={TVInfo.vote_average}
            overview={TVInfo.overview}
            genres={TVInfo.genres}
            release_date={TVInfo.first_air_date}
            poster_path={TVInfo.poster_path}
            backdrop_path={TVInfo.backdrop_path}
            traierVideoKey={traierVideoKey}
          />
          <div className="bg-black">
            <div className="mx-auto flex max-w-screen-xl gap-6 bg-black px-6 py-10 text-[1.3vw] text-white">
              <div className="flex-2 text-[1vw]">
                <ActorList movieInfor={TVInfo.aggregate_credits?.cast || []} />
                {/* <ActorList movieInfor={TVInfo.credits?.cast || []} /> */}
                <RelatedMediaList movieRelated={movieRelated} />
                <SeasonList
                  seasons={TVInfo.seasons ? TVInfo.seasons.reverse() : []}
                />

                {/* Watch Providers */}
                <div className="mt-8">
                  <WatchProviders mediaId={id} mediaType="tv" />
                </div>

                {/* Reviews */}
                <div className="mt-8">
                  <Reviews mediaId={id} mediaType="tv" />
                </div>
              </div>
              <div className="flex-1">
                <TvShowInformation tvInfo={TVInfo} />
              </div>
            </div>

            {/* Similar TV Shows and Recommendations */}
            <SimilarMedia mediaId={id} mediaType="tv" />
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

export default TvShowDetail;
