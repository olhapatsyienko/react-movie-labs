import React from "react";
import { getTrendingMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'

const TrendingMoviesPage = (props) => {

  const { data, error, isPending, isError  } = useQuery({
    queryKey: ['trending'],
    queryFn: getTrendingMovies,
  })
  
  if (isPending) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  
  if (!data) {
    return <Spinner />
  }
  
  const movies = data;

  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))
  const addToFavorites = (movieId) => true 

  return (
    <PageTemplate
      title="Trending Movies This Week"
      movies={movies}
      action={(movie) => {
        console.log('TrendingMoviesPage action called for movie:', movie.title);
        return <AddToFavoritesIcon movie={movie} />
      }}
    />
  );
};

export default TrendingMoviesPage;
