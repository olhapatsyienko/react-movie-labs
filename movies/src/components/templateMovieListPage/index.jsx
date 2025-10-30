import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";

function MovieListPageTemplate({ movies, title, action }) {

  console.log('MovieListPageTemplate received action:', typeof action, action);

  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");
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

  // Sorting logic
  const compareFn = (a, b) => {
    const direction = sortOrder === 'asc' ? 1 : -1;
    switch (sortBy) {
      case 'title': {
        const aTitle = a.title || '';
        const bTitle = b.title || '';
        return aTitle.localeCompare(bTitle) * direction;
      }
      case 'release_date': {
        const aDate = a.release_date || '';
        const bDate = b.release_date || '';
        return (aDate > bDate ? 1 : aDate < bDate ? -1 : 0) * direction;
      }
      case 'vote_average': {
        const av = Number(a.vote_average) || 0;
        const bv = Number(b.vote_average) || 0;
        return (av - bv) * direction;
      }
      case 'vote_count': {
        const av = Number(a.vote_count) || 0;
        const bv = Number(b.vote_count) || 0;
        return (av - bv) * direction;
      }
      case 'popularity':
      default: {
        const av = Number(a.popularity) || 0;
        const bv = Number(b.popularity) || 0;
        return (av - bv) * direction;
      }
    }
  };

  displayedMovies = [...displayedMovies].sort(compareFn);

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else if (type === "genre") setGenreFilter(value);
    else if (type === "year") setYearFilter(value);
    else if (type === "rating") setRatingFilter(value);
    else if (type === "sortBy") setSortBy(value);
    else if (type === "sortOrder") setSortOrder(value);
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
            sortBy={sortBy}
            sortOrder={sortOrder}
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
