import { createSlice } from "@reduxjs/toolkit";
import { initializeUseSelector } from "react-redux/es/hooks/useSelector";

export const genresSlice = createSlice({
    name: "genresSlice",
    initialState: {
        genresIdOrCategoryName: "",
        page: 1,
        searchQuery: "",
        searchIsActive: false,
        genresName: "All Genres",
        mediaType: "movie",
        movieInfoObj: {},
  


    },
    reducers: {
        selectGenres: (state, action) => {

            state.genresIdOrCategoryName = action.payload
            state.searchIsActive = false
        },
        selectName: (state, action) => {

            state.genresName = action.payload
            state.searchIsActive = false
        },

        increment: (state) => {
            state.page++
            state.searchIsActive = false
        },
        decrement: (state) => {
            state.page--
            state.searchIsActive = false
        },
        resetPage: (state) => {
            state.page = 1
            state.searchIsActive = false
            state.searchQuery = ""
        },
        searchInput: (state, action) => {
            state.searchQuery = action.payload
            state.searchIsActive = true

            if (state.searchQuery === "") {
                state.searchIsActive = false
            }

        },
        cc: (state) => {



            state.searchQuery = ""
            state.searchIsActive = false
            if (state.searchQuery === "") {
                state.searchIsActive = false
            }


        },
        media: (state, action) => {


            state.mediaType = action.payload


        },
        selectMovieInfo: (state, action) => {



            state.movieInfoObj = action.payload


        },
        clearSelectMovieInfo: (state, action) => {


            state.movieInfoObj = {}



        },
        whatchListData: (state, action) => {


            state.whatchListRTK = action.payload



        },
        profileClearSearch: (state) => {
            state.searchIsActive = false
            state.searchQuery = ""
        }


    }
})

export const {
    selectGenres,
    increment,
    decrement,
    resetPage,
    searchInput,
    selectName,
    cc,
    media,
    selectMovieInfo,
    clearSelectMovieInfo,
    whatchListData,
    profileClearSearch
} = genresSlice.actions

export default genresSlice.reducer