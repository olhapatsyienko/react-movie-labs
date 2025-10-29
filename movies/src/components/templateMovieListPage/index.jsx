import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";

function MovieListPageTemplate({ movies, title, action }) {

  console.log('MovieListPageTemplate received action:', typeof action, action);

  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [yearFilter, setYearFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");
  const genreId = Number(genreFilter);

  let displayedMovies = movies
    .filter((m) => {
      return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    })
    .filter((m) => {
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    })
    .filter((m) => {
      if (!yearFilter) return true;
      if (!m.release_date) return false;
      const movieYear = m.release_date.split('-')[0];
      return movieYear === yearFilter;
    })
    .filter((m) => {
      if (!ratingFilter) return true;
      if (!m.vote_average && m.vote_average !== 0) return false;
      const rating = Number(ratingFilter);
      if (rating === 0) {
        return m.vote_average < 5.0;
      } else {
        return m.vote_average >= rating;
      }
    });

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else if (type === "genre") setGenreFilter(value);
    else if (type === "year") setYearFilter(value);
    else if (type === "rating") setRatingFilter(value);
  };

  return (
    <Grid container>
      <Grid size={12}>
        <Header title={title} />
      </Grid>
      <Grid container sx={{flex: "1 1 500px", alignItems: "flex-start"}}>
        <Grid 
          key="find" 
          size={{xs: 12, sm: 6, md: 4, lg: 3, xl: 2}} 
          sx={{
            padding: "20px",
            position: "sticky",
            top: "80px",
            height: "fit-content",
            zIndex: 1000
          }}
        >
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
            yearFilter={yearFilter}
            ratingFilter={ratingFilter}
          />
        </Grid>
        <Grid 
          size={{xs: 12, sm: 6, md: 8, lg: 9, xl: 10}}
          sx={{padding: "20px"}}
        >
          <MovieList action={action} movies={displayedMovies}></MovieList>
        </Grid>
      </Grid>
    </Grid>
  );
}
export default MovieListPageTemplate;
