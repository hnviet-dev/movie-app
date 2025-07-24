export const TABS_TRENDING = [
  {
    id: "all",
    name: "All",
    url: "https://api.themoviedb.org/3/trending/all/week",
  },
  {
    id: "movie",
    name: "Movie",
    url: "https://api.themoviedb.org/3/trending/movie/week",
  },
  {
    id: "tv",
    name: "TV Show",
    url: "https://api.themoviedb.org/3/trending/tv/week",
  },
];
export const TABS_TOP_RATE = [
  {
    id: "movie",
    name: "Movie",
    url: "https://api.themoviedb.org/3/movie/top_rated",
  },
  {
    id: "tv",
    name: "TV Show",
    url: "https://api.themoviedb.org/3/tv/top_rated",
  },
];
export const TABS_Popular = [
  {
    id: "movie",
    name: "Movie",
    url: "https://api.themoviedb.org/3/movie/popular",
  },
  { id: "tv", name: "TV Show", url: "https://api.themoviedb.org/3/tv/popular" },
];

// New tabs for additional functionality
export const TABS_NOW_PLAYING = [
  {
    id: "movie",
    name: "Movie",
    url: "https://api.themoviedb.org/3/movie/now_playing",
  },
  {
    id: "tv",
    name: "TV Show",
    url: "https://api.themoviedb.org/3/tv/airing_today",
  },
];

export const TABS_UPCOMING = [
  {
    id: "movie",
    name: "Movie",
    url: "https://api.themoviedb.org/3/movie/upcoming",
  },
  {
    id: "tv",
    name: "TV Show",
    url: "https://api.themoviedb.org/3/tv/on_the_air",
  },
];

export const GENDER_MAPING = {
  0: "NOT SET",
  1: "Female",
  2: "MALE",
  3: "Non-Binary",
};
