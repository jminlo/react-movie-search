import React, { useState, useEffect } from 'react';
import ActorSelect from './ActorSelect';
import YearSelect from './YearSelect';
import List from './List';
import Movie from './Movie';
import MovieAdd from './MovieAdd';
import TitleSearch from './MovieTitleSearch';

import '../styles/App.css'

function App() {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    const sortMovies = (moviesArray) => {
        return [...moviesArray].sort((a, b) => a.title.localeCompare(b.title));
    };

    const fetchMovies = async () => {
        try {
            const response = await fetch('http://localhost:8888/movies');
            if (!response.ok) {
                throw new Error('Failed to fetch movies');
            }
            const data = await response.json();
            setMovies(sortMovies(data));
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    useEffect(() => {
        fetchMovies();
        const intervalId = setInterval(fetchMovies, 10000);
        return () => clearInterval(intervalId);
    }, []);

    const fetchFilteredMovies = async (endpoint, errorMessage) => {
        try {
            const response = await fetch(endpoint);
            if (!response.ok) {
                throw new Error(errorMessage);
            }
            const data = await response.json();
            setMovies(sortMovies(data));
            setSelectedMovie(null);
        } catch (error) {
            console.error(errorMessage, error);
        }
    };

    const handleMovieSelect = async (movieId) => {
        const movie = movies.find((m) => m.id === movieId);
        if (movie) {
            try {
                const response = await fetch(`http://localhost:8888/movies/${movieId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch movie details');
                }
                const movieDetails = await response.json();
                setSelectedMovie({ ...movie, ...movieDetails });
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        }
    };

    const handleAddMovie = () => {
        fetchMovies();
    };

    return (
        <div>
            <h1>Movie Search App</h1>

            <MovieAdd onAddMovie={handleAddMovie} />

            <ActorSelect
                onActorSelect={(moviesData) => setMovies(sortMovies(moviesData))}
                onActorChange={(actorName) => fetchFilteredMovies(`http://localhost:8888/actors/${actorName}`, 'Failed to fetch movies by actor')}
            />

            <YearSelect onMoviesFetched={(moviesData) => setMovies(sortMovies(moviesData))} />

            <TitleSearch onTitleSearch={(title) => fetchFilteredMovies(`http://localhost:8888/movies?title=${title}`, 'Failed to fetch movies by title')} />

            <List movies={movies} func={handleMovieSelect} />

            {selectedMovie && <Movie {...selectedMovie} />}
        </div>
    );
}

export default App;