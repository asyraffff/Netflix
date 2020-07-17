import React, { useState, useEffect } from 'react'
import axios from "../API/axios"
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import '../styles/Row.css';

const base_url = "https://image.tmdb.org/t/p/original/";


function Row({ title, fetchUrl, isLargeRow }) {
    //set state for movies and the trailer to display in the rows
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    //a snippet of code runs based on a specific condition
    useEffect(() => {
        // if [] run once when the row loads, then dont run again
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;

        }
        fetchData();

    }, [fetchUrl]);

    //options for react youtube
    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,

        },
    };

    //for when the user clicks on the movie thumbnail, this handles the onClick
    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl('');
        } else {
            movieTrailer(movie?.name || "")
                .then(url => {
                    //destructure the url so that only the video ID that is needed, gets fetched
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get('v'));

                }).catch(error => console.log(error))
        }
    }


    return (
        <div className="row">
            <h2>{title}</h2>

            <div className="row__posters">
                {/*posters*/}

                {movies.map(movie => (
                    <img
                        key={movie.id}
                        onClick={() => handleClick(movie)}
                        className={`row__poster ${isLargeRow && "row_posterLarge"}`}
                        src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name} />
                ))}
            </div>
            {/*When we have the trailer URL, then we will show the youtube video */}
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}

        </div>
    )
}

export default Row