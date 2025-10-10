export const getMovies = () => {
  return fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=1`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
      throw error
  });
};

  
export const getMovie = (id) => {
  console.log('getMovie called with id:', id, 'type:', typeof id);
  
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`
  ).then((response) => {
    console.log('getMovie response status for id', id, ':', response.status);
    if (!response.ok) {
      return response.json().then((error) => {
        console.error('getMovie API error for id', id, ':', error);
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .then((data) => {
    console.log('getMovie success for id', id, ':', data.title);
    return data;
  })
  .catch((error) => {
    console.error('getMovie catch error for id', id, ':', error);
    throw error
 });
};

  export const getGenres = () => {
    console.log('getGenres called, API key:', import.meta.env.VITE_TMDB_KEY ? 'present' : 'missing');
    return fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
        import.meta.env.VITE_TMDB_KEY +
        "&language=en-US"
    ).then( (response) => {
      console.log('getGenres response status:', response.status);
      if (!response.ok) {
        return response.json().then((error) => {
          console.error('getGenres API error:', error);
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .then((data) => {
      console.log('getGenres success, data:', data);
      return data;
    })
    .catch((error) => {
      console.error('getGenres catch error:', error);
      throw error
   });
  };

  
  export const getMovieImages = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/images?api_key=${import.meta.env.VITE_TMDB_KEY}`
    ).then( (response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };


  export const getMovieReviews = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${import.meta.env.VITE_TMDB_KEY}`
    ).then( (response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };

  export const getUpcomingMovies = () => {
    return fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=1`
    ).then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error
    });
  };

  
  