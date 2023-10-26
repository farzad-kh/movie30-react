import { configureStore } from '@reduxjs/toolkit'
import { tmdbSlice } from '../services/tmdbSlice'
import genresSliceReducer from "../features/currentGenres "
import userReducer from '../features/auth'

export default configureStore({
  reducer: {
    [tmdbSlice.reducerPath]: tmdbSlice.reducer,
    currentGenres: genresSliceReducer,
    user: userReducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      tmdbSlice.middleware,
   

    ]

    ),
})
