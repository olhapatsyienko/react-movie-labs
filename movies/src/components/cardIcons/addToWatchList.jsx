import React from "react";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

const AddToWatchListIcon = ({ movie }) => {
  const handleAddToWatchList = (e) => {
    e.preventDefault();
    // TODO: Implement add to watch list functionality
    console.log('Add to watch list clicked for movie:', movie.title);
  };

  return (
    <IconButton aria-label="add to watch list" onClick={handleAddToWatchList}>
      <PlaylistAddIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToWatchListIcon;
