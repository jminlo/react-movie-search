import React, { useState } from 'react';

import '../styles/search_section.css'

function YearSelect({ onMoviesFetched }) {
    const [year, setYear] = useState('');
    const [error, setError] = useState('');

    const fetchMoviesByYear = async () => {
        const parsedYear = parseInt(year, 10);
        if (isNaN(parsedYear)) {
            setError('Please enter a valid year');
            return;
        }

        try {
            setError('');
            const response = await fetch(`http://localhost:8888/years/${parsedYear}`);
            if (!response.ok) {
                throw new Error(`No movies found for the year ${parsedYear}`);
            }
            const movies = await response.json();
            onMoviesFetched(movies);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleInputChange = (e) => {
        setYear(e.target.value);
    };

    return (
        <div className='search-section'>
            <input
                type="text"
                placeholder="Enter year"
                value={year}
                onChange={handleInputChange}
                className='searchBar'
            />
            <button onClick={fetchMoviesByYear}>Search Year</button>
            {error && <p>{error}</p>}
        </div>
    );
}

export default YearSelect;
