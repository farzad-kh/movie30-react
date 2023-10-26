// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// const TOKEN = import.meta.env.VITE_TMDB_URL
// const BASE_URL = import.meta.env.VITE_TMDB_URL

// const tmdbApiHeaders = {
//   accept: 'application/json',
//   Authorization: TOKEN
// }


// //  const options = {
// //     method: 'GET',
// //     url: 'https://api.themoviedb.org/3/movie/popular',


// //   };



// export const tmdbSlice = createApi({
//   reducerPath: 'tmdbSlice',
//   baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
//   endpoints: (builder) => ({
//     getPopular: builder.query({

//       query: ({ page}) => ({

//         method: 'GET',

//        url:"movie/popular",


//         params: {

//           language: 'en-US',
//           page: page,

//         },

//         headers: {
//           accept: 'application/json',
//           Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Njk5MTQ5NWYwMWExODRmMTg4ZGYzNmZiYTAwNjJmYSIsInN1YiI6IjYzMTY0MTlhYTg0YTQ3MDA3ZGMxNzJlZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.F_29ghSyysigFSM_qj9LfJAuaiHwyIhcsnB2Iv7uL6Q'
//         }

//       })
//     }),
//     getAllGenres: builder.query({

//       query: ({ page, genresIdOrCategoryName }) => ({

//         method: 'GET',

//         //  url:"movie/popular",
//         url: "/discover/movie",

//         params: {
//           include_adult: 'false',
//           include_video: 'false',
//           language: 'en-US',
//           page: page,
//           sort_by: 'popularity.desc',
//           with_genres: genresIdOrCategoryName.id
//         },

//         headers: {
//           accept: 'application/json',
//           Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Njk5MTQ5NWYwMWExODRmMTg4ZGYzNmZiYTAwNjJmYSIsInN1YiI6IjYzMTY0MTlhYTg0YTQ3MDA3ZGMxNzJlZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.F_29ghSyysigFSM_qj9LfJAuaiHwyIhcsnB2Iv7uL6Q'
//         }

//       })
//     }),










//     getGenres: builder.query({

//       query: () => ({

//         method: 'GET',
//         url: 'genre/movie/list',
//         params: { language: 'en-US' },
//         headers: {
//           accept: 'application/json',
//           Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Njk5MTQ5NWYwMWExODRmMTg4ZGYzNmZiYTAwNjJmYSIsInN1YiI6IjYzMTY0MTlhYTg0YTQ3MDA3ZGMxNzJlZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.F_29ghSyysigFSM_qj9LfJAuaiHwyIhcsnB2Iv7uL6Q'
//         }

//       })
//     }),



//     getTopRated: builder.query({

//       query: ({ page }) => ({

//         method: 'GET',
//         url: 'movie/top_rated',
//         params: { language: 'en-US', page },
//         headers: {
//           accept: 'application/json',
//           Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Njk5MTQ5NWYwMWExODRmMTg4ZGYzNmZiYTAwNjJmYSIsInN1YiI6IjYzMTY0MTlhYTg0YTQ3MDA3ZGMxNzJlZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.F_29ghSyysigFSM_qj9LfJAuaiHwyIhcsnB2Iv7uL6Q'
//         }

//       })
//     }),
//     getSearch: builder.query({

//       query: ({searchQuery}) => ({
//         method: 'GET',
//         url: 'search/multi',
//         params: { query:searchQuery, include_adult: 'false', language: 'en-US', page: '1' },
//         headers: {
//           accept: 'application/json',
//           Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Njk5MTQ5NWYwMWExODRmMTg4ZGYzNmZiYTAwNjJmYSIsInN1YiI6IjYzMTY0MTlhYTg0YTQ3MDA3ZGMxNzJlZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.F_29ghSyysigFSM_qj9LfJAuaiHwyIhcsnB2Iv7uL6Q'
//         }

//       })
//     }),


//   }),
// })

// export const {
//   useGetPopularQuery,
//   useGetAllGenresQuery,
//   useGetGenresQuery,
//   useGetTopRatedQuery,
//   useGetSearchQuery,

// } = tmdbSlice
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const TOKEN = import.meta.env.VITE_TMDB_TOKEN
const BASE_URL = import.meta.env.VITE_TMDB_URL

const tmdbApiHeaders = {
  accept: 'application/json',
  Authorization: TOKEN
}


//  const options = {
//     method: 'GET',
//     url: 'https://api.themoviedb.org/3/movie/popular',


//   };



export const tmdbSlice = createApi({
  reducerPath: 'tmdbSlice',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getPopular: builder.query({

      query: ({ page }) => ({

        method: 'GET',

        url: "movie/popular",


        params: {

          language: 'en-US',
          page: page,

        },

        headers: tmdbApiHeaders


      })
    }),
    getAllGenres: builder.query({

      query: ({ page, genresIdOrCategoryName }) => ({

        method: 'GET',

        //  url:"movie/popular",
        url: "/discover/movie",

        params: {
          include_adult: 'false',
          include_video: 'false',
          language: 'en-US',
          page: page,
          sort_by: 'popularity.desc',
          with_genres: genresIdOrCategoryName
        },

        headers: tmdbApiHeaders

      })
    }),
    getTvPopular: builder.query({

      query: ({ page, media_type }) => ({

        method: 'GET',

        //  url:"movie/popular",
        url: `https://api.themoviedb.org/3/${media_type}/popular`,
        params: {language: 'en-US', page: page},

        headers: tmdbApiHeaders

      })
    }),




    getGenres: builder.query({

      query: () => ({

        method: 'GET',
        url: 'genre/movie/list',
        params: { language: 'en-US' },
        headers: tmdbApiHeaders

      })
    }),



    getTopRated: builder.query({

      query: ({ page }) => ({

        method: 'GET',
        url: 'movie/top_rated',
        params: { language: 'en-US', page },
        headers: tmdbApiHeaders
      })
    }),

    getSearch: builder.query({

      query: ({ searchQuery }) => ({
        method: 'GET',
        url: 'search/multi',
        params: { query: searchQuery, include_adult: 'false', language: 'en-US', page: '1' },
        headers: tmdbApiHeaders

      })
    }),
    getMovieInformations: builder.query({
      // content_ratings is for tv series if app buged remove it
      query: ({ id, media }) => ({
        method: 'GET',
        url: `${media}/${id}`,

        headers: tmdbApiHeaders,
        params: { append_to_response: 'credits,images,videos,release_dates,external_ids,content_ratings' },
      })
    }),
    getRecommended: builder.query({

      query: ({ id, media }) => ({
        method: 'GET',
        url: `${media}/${id}/recommendations`,

        headers: tmdbApiHeaders,

      })
    }),
    getList: builder.query({

      query: ({ accountId, listName, media, sessionId, page }) => ({
        method: 'GET',
        url: `https://api.themoviedb.org/3/account/${accountId}/${listName}/${media}?sort_by=created_at.desc`,
        params: { page: page, session_id: sessionId },

        headers: tmdbApiHeaders,

      })
    }),
    getListTv: builder.query({

      query: ({ accountId, listName, media, sessionId, page }) => ({
        method: 'GET',
        url: `https://api.themoviedb.org/3/account/${accountId}/${listName}/${media}?sort_by=created_at.desc`,
        params: { page: page, session_id: sessionId },

        headers: tmdbApiHeaders,

      })
    }),
    getActorList: builder.query({

      query: ({ id}) => ({
        method: 'GET',
        url: `https://api.themoviedb.org/3/person/${id}`,
        params: {append_to_response: 'external_ids,combined_credits,images,movie_credits,tv_credits'},
        headers: tmdbApiHeaders,

      })
    }),



    getSeriesInformations: builder.query({

      query: ({ id }) => ({
        method: 'GET',
        url: `tv/${id}`,

        headers: tmdbApiHeaders

      })
    }),


  }),
})

export const {
  useGetPopularQuery,
  useGetAllGenresQuery,
  useGetGenresQuery,
  useGetTopRatedQuery,
  useGetSearchQuery,
  useGetMovieInformationsQuery,
  useGetSeriesInformationsQuery,
  useGetRecommendedQuery,
  useGetListQuery,
 useGetListTvQuery,
 useGetActorListQuery,
 useGetTvPopularQuery

} = tmdbSlice
