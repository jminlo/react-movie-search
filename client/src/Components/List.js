import React from 'react';

const List = ({ movies, func, groupByYear }) => {
    if (!movies || movies.length === 0) {
        return <p>No movies to display.</p>;
    }

    const handleClick = (id) => {
        if (typeof func === 'function') {
            func(id);
        }
    };

    const renderMovies = (movies) => (
        <ul>
            {movies.map((movie) => (
                <li key={movie.id} onClick={() => handleClick(movie.id)}>
                    {movie.title} ({movie.year})
                </li>
            ))}
        </ul>
    );

    if (groupByYear) {
        const moviesByYear = movies.reduce((acc, movie) => {
            if (!acc[movie.year]) {
                acc[movie.year] = [];
            }
            acc[movie.year].push(movie);
            return acc;
        }, {});

        return (
            <div>
                {Object.entries(moviesByYear).map(([year, moviesInYear]) => (
                    <div key={year}>
                        <h2>{year}</h2>
                        {renderMovies(moviesInYear)}
                    </div>
                ))}
            </div>
        );
    }

    return renderMovies(movies);
};

export default List;
