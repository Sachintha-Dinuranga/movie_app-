export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  },
};

// fetch movies using queries
export const fetchMovies = async ({ query }: { query: string }) => {
  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

  const response = await fetch(endpoint, {
    method: "get",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    // @ts-ignore
    throw new Error("Failed to fetch movies", response.statusText);
  }

  const data = await response.json();

  return data.results;
};

// const url =
//   "https://api.themoviedb.org/3/keyword/keyword_id/movies?include_adult=false&language=en-US&page=1";
// const options = {
//   method: "GET",
//   headers: {
//     accept: "application/json",
//     Authorization:
//       "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmODQwNmNhN2ZkODQ2ZDU2MWUzOWE4ZjZmZDQ5YzczNiIsIm5iZiI6MTc0MTgzOTc3NS40MzEsInN1YiI6IjY3ZDI1ZDlmNDM0Yzk4YzhlYzgxYTU5OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.huHJn3-hepr51V2IXsyMtdxwLwXOlM_oZAi3DIMMPdY",
//   },
// };

// fetch(url, options)
//   .then((res) => res.json())
//   .then((json) => console.log(json))
//   .catch((err) => console.error(err));
