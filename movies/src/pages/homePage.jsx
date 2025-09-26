import React from "react";
import Grid from "@mui/material/Grid";
import MovieCard from '../components/index.jsx'

const HomePage = (props) => {
  const movies = props.movies;
    
  return (
  <Grid container>
      <Grid item xs={12}>
          <h1> HomePage </h1>
      </Grid>
      <Grid item xs={3}>
        <MovieCard movie={movies[0]} />
      </Grid>
    </Grid>
  );
};
export default HomePage;
