import React, { useState } from 'react';

function MovieAdd({ onAddMovie }) {
    const [movie, setMovie] = useState({
        Title: '',
        Genre: [],
        Actors: '',
        Year: '',
        Runtime: '',
        Revenue: '',
    });

    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMovie((prev) => ({
            ...prev,
            [name]: name === 'Genre' || name === 'Actors'
                ? value
                : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const movieData = {
            ...movie,
            Genre: movie.Genre.split(',').map(item => item.trim()),
            Actors: movie.Actors.split(',').map(item => item.trim()),
            Year: parseInt(movie.Year, 10),
            Runtime: parseFloat(movie.Runtime) || 0,
            Revenue: parseFloat(movie.Revenue) || 0,
        };

        if (!movieData.Title || !movieData.Year || !movieData.Genre.length || !movieData.Actors.length) {
            setError('Title, Year, Genre, and Actors are required fields.');
            return;
        }

        setError('');

        try {
            const response = await fetch('http://localhost:8888/movies', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(movieData),
            });

            if (!response.ok) {
                const errorText = await response.text();
                setError(`Error: ${errorText}`);
                return;
            }

            const data = await response.json();

            if (data.message === 'Movie added successfully') {
                onAddMovie(movieData.Year, movieData.Actors);
                setMovie({ Title: '', Genre: [], Actors: '', Year: '', Runtime: '', Revenue: '' });
            } else {
                setError(`Error adding movie: ${data.message}`);
            }
        } catch (error) {
            setError(`Error adding movie: ${error.message}`);
        }
    };

    return (
        <div>
            <h2>Add a New Movie</h2>
            <form onSubmit={handleSubmit}>
                {error && <p>{error}</p>}

                {['Title', 'Genre', 'Actors', 'Year', 'Runtime', 'Revenue'].map((field) => (
                    <label key={field}>
                        {field}:
                        <input
                            type="text"
                            name={field}
                            value={field === 'Actors' ? movie[field] : movie[field] instanceof Array ? movie[field].join(',') : movie[field]}
                            onChange={handleInputChange}
                            required={['Title', 'Year'].includes(field)}
                        />
                    </label>
                ))}

                <button type="submit">Add Movie</button>
            </form>
        </div>
    );
}

export default MovieAdd;
