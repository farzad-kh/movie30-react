

import axios from "axios"
const TOKEN = import.meta.env.VITE_TMDB_TOKEN
const BASE_URL = import.meta.env.VITE_TMDB_URL



export const moviesApi = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    params: {
        api_key: TOKEN
    }
});


export const fetchToken = async () => {
    const options = {
        method: 'GET',
        url: `${BASE_URL}authentication/token/new`,
        headers: {
            accept: 'application/json',
            Authorization: TOKEN
        }
    };


    try {
        const response = await axios.request(options);
        const token = response.data.request_token

        if (response.data.success) {
            localStorage.setItem(`request_token`, token)
            window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=${window.location.origin}/approved
            `
        }
    } catch (error) {
        console.error(error);
    }
}




export const createSessionId = async () => {

    const token = localStorage.getItem('request_token')
    const options = {

        method: 'POST',
        url: 'https://api.themoviedb.org/3/authentication/session/new',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Njk5MTQ5NWYwMWExODRmMTg4ZGYzNmZiYTAwNjJmYSIsInN1YiI6IjYzMTY0MTlhYTg0YTQ3MDA3ZGMxNzJlZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.F_29ghSyysigFSM_qj9LfJAuaiHwyIhcsnB2Iv7uL6Q'
        },
        data: { request_token: `${token}` }
    };


    axios
        .request(options)
        .then(function (response) {
            localStorage.setItem('session_id', response.data.session_id);
         return  response.data.session_id
        
        })
        .catch(function (error) {
            console.error(error);
        });




};



export const getProfile= async(dispatch,setUser)=>{
    const sessionIdLocalStorag = localStorage?.getItem("session_id")
    const options = {
        method: 'GET',
        url: `${BASE_URL}account`,
        headers: {
          accept: 'application/json',
          Authorization: TOKEN
        },
        data: { session_id: `${sessionIdLocalStorag}` }
      };

      axios
        .request(options)
        .then(function (response) {
          const userData = response.data
        
          dispatch(setUser(userData));

        })
        .catch(function (error) {
          console.error(error);
        });
}