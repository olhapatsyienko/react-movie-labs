import React from "react";
import { useParams } from 'react-router';
import MovieDetails from "../components/movieDetails/";
import PageTemplate from "../components/templateMoviePage";
import { getMovie, getMovieRecommendations } from '../api/tmdb-api'
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner'
import MovieList from '../components/movieList';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
// import useMovie from "../hooks/useMovie";   Redundant


const MoviePage = (props) => {
  const { id } = useParams();
  const { data: movie, error, isPending, isError  } = useQuery({
    queryKey: ['movie', {id: id}],
    queryFn: () => getMovie(id),
  })

  const { data: recommendations, error: recError, isPending: recPending, isError: recIsError } = useQuery({
    queryKey: ['recommendations', {id: id}],
    queryFn: () => getMovieRecommendations(id),
    enabled: !!id,
  })

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }


  return (
    <>
      {movie ? (
        <>
          <PageTemplate movie={movie}>
            <MovieDetails movie={movie} />
          </PageTemplate>
          
          {recommendations && recommendations.length > 0 && (
            <Box sx={{ padding: "20px", marginTop: "40px" }}>
              <Typography variant="h4" component="h2" sx={{ marginBottom: "20px", fontWeight: "bold" }}>
                Recommended Movies
              </Typography>
              <MovieList 
                action={(movie) => {
                  console.log('MovieDetailsPage recommendations action called for movie:', movie.title);
                  return <AddToFavoritesIcon movie={movie} />
                }} 
                movies={recommendations} 
              />
            </Box>
          )}
        </>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default MoviePage;
