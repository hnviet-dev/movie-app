import { useState, useEffect } from "react";

function Reviews({ mediaId, mediaType = "movie" }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (!mediaId) return;

    const fetchReviews = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/${mediaType}/${mediaId}/reviews?page=1`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
            },
          },
        );

        const data = await response.json();
        setReviews(data.results || []);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [mediaId, mediaType]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const truncateText = (text, maxLength = 300) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + "...";
  };

  const getRatingColor = (rating) => {
    if (rating >= 8) return "text-green-400";
    if (rating >= 6) return "text-yellow-400";
    if (rating >= 4) return "text-orange-400";
    return "text-red-400";
  };

  if (loading) {
    return (
      <div className="rounded-lg bg-gray-900 p-6">
        <div className="text-white">Loading reviews...</div>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="rounded-lg bg-gray-900 p-6">
        <h3 className="mb-4 text-xl font-bold text-white">Reviews</h3>
        <div className="text-gray-400">No reviews available</div>
      </div>
    );
  }

  const displayedReviews = showAll ? reviews : reviews.slice(0, 3);

  return (
    <div className="rounded-lg bg-gray-900 p-6">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xl font-bold text-white">
          Reviews ({reviews.length})
        </h3>
        {reviews.length > 3 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-sm text-blue-400 hover:text-blue-300"
          >
            {showAll ? "Show Less" : "Show All"}
          </button>
        )}
      </div>

      <div className="space-y-6">
        {displayedReviews.map((review) => (
          <div
            key={review.id}
            className="border-b border-gray-700 pb-6 last:border-b-0"
          >
            <div className="mb-3 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-700">
                  {review.author_details?.avatar_path ? (
                    <img
                      src={
                        review.author_details.avatar_path.startsWith("/https")
                          ? review.author_details.avatar_path.substring(1)
                          : `https://image.tmdb.org/t/p/w45${review.author_details.avatar_path}`
                      }
                      alt={review.author}
                      className="h-full w-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="font-semibold text-white">
                      {review.author.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <div>
                  <h4 className="font-semibold text-white">{review.author}</h4>
                  <p className="text-sm text-gray-400">
                    {formatDate(review.created_at)}
                  </p>
                </div>
              </div>

              {review.author_details?.rating && (
                <div
                  className={`font-bold ${getRatingColor(review.author_details.rating)}`}
                >
                  ★ {review.author_details.rating}/10
                </div>
              )}
            </div>

            <div className="leading-relaxed text-gray-300">
              {showAll ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: review.content.replace(/\n/g, "<br/>"),
                  }}
                />
              ) : (
                <div
                  dangerouslySetInnerHTML={{
                    __html: truncateText(review.content).replace(
                      /\n/g,
                      "<br/>",
                    ),
                  }}
                />
              )}
            </div>

            {review.url && (
              <div className="mt-3">
                <a
                  href={review.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-400 underline hover:text-blue-300"
                ></a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reviews;
