import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Actors, Home, MovieInformation, Profile } from '../components';
import TopRated from '../pages/TopRated';
import MoviesGenres from '../components/MoviesGenres/MoviesGenres';
import LoginOrSignUp from '../pages/LoginOrSignUp';
import WhatchLists from '../pages/WhatchLists';
import FavoriteLists from '../pages/FavoriteLists';
import TvPopular from '../pages/TvPopular';

const Router = () => 
    (
        <Routes>
           
     
        <Route path="/" element={<Home />} />
 
                  <Route path="/toprated" element={<TopRated />} />
               
                  <Route
                    path="/movies/:media/:id"
                    element={<MovieInformation />}
                  />
                  <Route path="/movies/genres" element={<MoviesGenres />} />
                  <Route path="actors/:id" element={<Actors />} />
                  <Route path="/profile/:id" element={<Profile />} />
                  <Route path="/login-or-signup" element={<LoginOrSignUp />} />
                  <Route path="/user/whatchlist" element={<WhatchLists />} />
                  <Route path="/user/favorites" element={<FavoriteLists />} />
                  <Route path="/tvseries" element={<TvPopular />} />

       
        </Routes>)
   


export default Router;