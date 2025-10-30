import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favouriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import TopRatedMoviesPage from "./pages/topRatedMoviesPage";
import NowPlayingMoviesPage from "./pages/nowPlayingMoviesPage";
import PopularMoviesPage from "./pages/popularMoviesPage";
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import TrendingMoviesPage from "./pages/trendingMoviesPage";
import LatestMoviePage from "./pages/latestMoviePage";
import PersonDetailsPage from "./pages/personDetailsPage";
import PlaylistPage from "./pages/playlistPage";
import SiteHeader from './components/siteHeader'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});


const App = () => {
  return (
    <BrowserRouter>
      <SiteHeader />
      <Routes>
        <Route path="/reviews/:id" element={ <MovieReviewPage /> } />
        <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
        <Route path="/movies/playlist" element={<PlaylistPage />} />
        <Route path="/movies/top-rated" element={<TopRatedMoviesPage />} />
        <Route path="/movies/popular" element={<PopularMoviesPage />} />
        <Route path="/movies/now-playing" element={<NowPlayingMoviesPage />} />
        <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
        <Route path="/movies/trending" element={<TrendingMoviesPage />} />
        <Route path="/movies/latest" element={<LatestMoviePage />} />
        <Route path="/person/:id" element={<PersonDetailsPage />} />
        <Route path="/movies/:id" element={<MoviePage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={ <Navigate to="/" /> } />
      </Routes>
    </BrowserRouter>

  );
};


const rootElement = createRoot( document.getElementById("root") )
rootElement.render(
  <QueryClientProvider client={queryClient}>
    <MoviesContextProvider>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </MoviesContextProvider>
  </QueryClientProvider>
);
