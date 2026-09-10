import React from 'react';
import Actor from './Actor';
import Genre from './Genre';

function Movie({ title, year, runtime, revenue, actors, genre }) {
    if (!title || !year || !runtime || !revenue) {
        return <p>Movie details are incomplete.</p>;
    }

    return (
        <div>
            <h4>{title}</h4>
            <p>Year: {year}</p>
            <p>Runtime: {runtime} minutes</p>
            <p>Revenue: ${revenue} million</p>
            <Actor actors={actors} />
            <Genre genre={genre} />
        </div>
    );
}

export default Movie;