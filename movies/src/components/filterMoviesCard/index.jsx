import React, {useState, useEffect}  from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getGenres } from "../../api/tmdb-api";
import { useQuery } from '@tanstack/react-query';
import Spinner from '../spinner';


const formControl = 
  {
    margin: 1,
    minWidth: "90%",
    backgroundColor: "rgb(255, 255, 255)"
  };

export default function FilterMoviesCard(props) {

  const { data, error, isPending, isError } = useQuery({
    queryKey: ['genres'],
    queryFn: getGenres,
    retry: 3,
    retryDelay: 1000,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  
  if (!data) {
    return <Spinner />;
  }
  
  const genres = [...data];

  const handleChange = (e, type, value) => {
    e.preventDefault();
    props.onUserInput(type, value); 
  };

  const handleTextChange = (e, props) => {
    handleChange(e, "name", e.target.value);
  };

  const handleGenreChange = (e) => {
    handleChange(e, "genre", e.target.value);
  };

  const handleYearChange = (e) => {
    handleChange(e, "year", e.target.value);
  };

  const handleRatingChange = (e) => {
    handleChange(e, "rating", e.target.value);
  };

  const handleSortByChange = (e) => {
    handleChange(e, "sortBy", e.target.value);
  };

  const handleSortOrderChange = (e) => {
    handleChange(e, "sortOrder", e.target.value);
  };

  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = currentYear; year >= 1900; year--) {
    years.push(year.toString());
  }
  const ratingOptions = [
    { value: "", label: "All ratings" },
    { value: "8", label: "8.0 and above" },
    { value: "7", label: "7.0 and above" },
    { value: "6", label: "6.0 and above" },
    { value: "5", label: "5.0 and above" },
    { value: "0", label: "Below 5.0" },
  ];

  const sortByOptions = [
    { value: 'popularity', label: 'Popularity' },
    { value: 'vote_average', label: 'Rating' },
    { value: 'vote_count', label: 'Vote count' },
    { value: 'release_date', label: 'Release date' },
    { value: 'title', label: 'Title' },
  ];
  const sortOrderOptions = [
    { value: 'desc', label: 'Descending' },
    { value: 'asc', label: 'Ascending' },
  ];


  return (
    <Card 
      sx={{
        backgroundColor: "rgb(204, 204, 0)"
      }} 
      variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h1">
          <SearchIcon fontSize="large" />
          Filter the movies.
        </Typography>
        <TextField
          sx={{...formControl}}
          id="filled-search"
          key="titleFilter"
          label="Search field"
          type="search"
          variant="filled"
          value={props.titleFilter}
          onChange={handleTextChange}
        />

        <FormControl sx={{...formControl}}>
          <Select
             id="genre-select"
             defaultValue=""
             value={props.genreFilter || ""}
             onChange={handleGenreChange}
             displayEmpty
            >
            <MenuItem value="">All genres</MenuItem>
            {genres.map((genre) => {
              return (
                <MenuItem key={genre.id} value={genre.id}>
                  {genre.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <FormControl sx={{...formControl}}>
          <Select
             id="year-select"
             defaultValue=""
             value={props.yearFilter || ""}
             onChange={handleYearChange}
             displayEmpty
            >
            <MenuItem value="">All years</MenuItem>
            {years.map((year) => {
              return (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <FormControl sx={{...formControl}}>
          <Select
             id="rating-select"
             defaultValue=""
             value={props.ratingFilter || ""}
             onChange={handleRatingChange}
             displayEmpty
            >
            {ratingOptions.map((option) => {
              return (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <FormControl sx={{...formControl}}>
          <Select
             id="sortby-select"
             defaultValue=""
             value={props.sortBy || ''}
             onChange={handleSortByChange}
             displayEmpty
            >
            <MenuItem value="">Sort by</MenuItem>
            {sortByOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{...formControl}}>
          <Select
             id="sortorder-select"
             defaultValue=""
             value={props.sortOrder || ''}
             onChange={handleSortOrderChange}
             displayEmpty
            >
            <MenuItem value="">Order</MenuItem>
            {sortOrderOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </CardContent>
    </Card>
  );
}
