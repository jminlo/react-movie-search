import React from 'react';

function Genre({ genre }) {
    if (!Array.isArray(genre) || genre.length === 0) {
        return <p>No genres available</p>;
    }

    return (
        <div>
            <h3>Genres</h3>
            <ul>
                {genre.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
}

export default Genre;
