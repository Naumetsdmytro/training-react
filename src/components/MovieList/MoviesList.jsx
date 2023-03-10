export const MoviesList = ({ movies, onDelete, onChange }) => {
  return (
    <ul>
      {movies.map(({ isWatched, path, votes, title, id }) => {
        return (
          <li key={id}>
            <h2>{title}</h2>
            <p>Post: {votes}</p>
            <p>Watched: {`${isWatched}`}</p>
            <button onClick={() => onDelete(id)} type="button">
              Delete
            </button>
            <button onClick={() => onChange(id)} type="button">
              Change Status
            </button>
          </li>
        );
      })}
    </ul>
  );
};
