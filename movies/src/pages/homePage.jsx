import React, { useState, useEffect } from "react";  
import MovieList from "../components/movieList";
import Grid from "@mui/material/Grid";
import Header from '../components/headerMovieList';
import FilterCard from "../components/filterMoviesCard";

const HomePage = (props) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&page=1`
    )
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        return json.results;
      })
      .then((movies) => {
        setMovies(movies);
      });
  }, []);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Header title={"Home Page"} />
      </Grid>
      <Grid container sx={{flex: "1 1 500px"}}>
        <Grid item xs={12} sm={4} md={3} lg={2} sx={{padding: "20px"}}>
          <FilterCard />
        </Grid>
        <Grid item xs={12} sm={8} md={9} lg={10}>
          <MovieList movies={movies}></MovieList>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default HomePage;
