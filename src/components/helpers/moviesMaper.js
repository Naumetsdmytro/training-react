export const moviesMapper = array => {
  return array.map(({ poster_path: path, vote_count: votes, title, id }) => ({
    isWatched: false,
    path,
    votes,
    title,
    id,
  }));
};
