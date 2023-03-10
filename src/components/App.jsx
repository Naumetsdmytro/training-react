import { useState, useEffect } from 'react';

import { Button } from '../components/Button/Button';
import { fetchMovies } from '../components/services/fetchmovies';
import { moviesMapper } from './helpers/moviesMaper';
import { MoviesList } from './MovieList/MoviesList';

export const App = () => {
  const [isMovieShown, setMovieShown] = useState(false);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [movies, setMovies] = useState([]);

  const swowMovieList = () => {
    setMovieShown(prev => !prev);
  };

  useEffect(() => {
    if (!isMovieShown) {
      setMovies([]);
      return;
    }
    setIsLoading(true);
    fetchMovies(page)
      .then(({ data: { results } }) => {
        setMovies(prev => [...prev, ...moviesMapper(results)]);
        setError('');
      })
      .catch(error => setError(error.message))
      .finally(() => setIsLoading(true));
  }, [isMovieShown, page]);

  const handleDelete = movieId => {
    setMovies(prev => prev.filter(({ id }) => id !== movieId));
  };

  const changeStatus = movieId => {
    setMovies(prev =>
      prev.map(movie => {
        if (movie.id === movieId) {
          return {
            ...movie,
            isWatched: !movie.isWatched,
          };
        }
        return movie;
      })
    );
  };

  return (
    <div>
      <Button
        text={isMovieShown ? 'Hide Movie List' : 'Show Movie List'}
        clickHandler={swowMovieList}
      />
      {isMovieShown && (
        <MoviesList
          movies={movies}
          onDelete={handleDelete}
          onChange={changeStatus}
        />
      )}
    </div>
  );
};
