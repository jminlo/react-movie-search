const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 8888;
const MOVIES_FILE = path.join(__dirname, 'data', 'movies.json');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client', 'public')));

const readMovies = async () => {
    const data = await fs.readFile(MOVIES_FILE, 'utf-8');
    return JSON.parse(data);
};

const writeMovies = async (movies) => {
    await fs.writeFile(MOVIES_FILE, JSON.stringify(movies, null, 2));
};

app.get('/movies', async (req, res) => {
    try {
        const { title } = req.query;
        let movies = await readMovies();

        if (title) {
            const regex = new RegExp(title, 'i');
            movies = movies.filter(movie => regex.test(movie.Title));
        }

        movies.sort((a, b) => a.Title.localeCompare(b.Title));
        res.json(movies.map(({ Key, Title, Year }) => ({ id: Key, title: Title, year: Year })));
    } catch (error) {
        res.status(500).send('Error fetching movies');
    }
});

app.get('/movies/:id', async (req, res) => {
    try {
        const movieId = Number(req.params.id);
        const movies = await readMovies();
        const movie = movies.find(m => m.Key === movieId);

        if (movie) {
            res.json({
                id: movie.Key,
                title: movie.Title,
                year: movie.Year,
                runtime: movie.Runtime,
                revenue: movie.Revenue,
                actors: movie.Actors,
                genre: movie.Genre
            });
        } else {
            res.status(404).send('Movie not found');
        }
    } catch (error) {
        res.status(500).send('Error fetching movie details');
    }
});

app.get('/actors/:name', async (req, res) => {
    try {
        const actorName = req.params.name;
        const movies = await readMovies();
        const regex = new RegExp(actorName, 'i');

        const actorMovies = movies
            .filter(movie => movie.Actors.some(actor => regex.test(actor)))
            .map(({ Key, Title, Year }) => ({ id: Key, title: Title, year: Year }))
            .sort((a, b) => a.title.localeCompare(b.title));

        res.json(actorMovies);
    } catch (error) {
        res.status(500).send('Error fetching actor movies');
    }
});

app.get('/years/:year', async (req, res) => {
    try {
        const year = parseInt(req.params.year, 10);
        const movies = await readMovies();

        const moviesByYear = movies
            .filter(movie => movie.Year === year)
            .map(({ Key, Title, Year, Runtime, Revenue, Actors, Genre }) => ({
                id: Key, title: Title, year: Year, runtime: Runtime, revenue: Revenue, actors: Actors, genre: Genre
            }))
            .sort((a, b) => a.title.localeCompare(b.title));

        if (moviesByYear.length > 0) {
            res.json(moviesByYear);
        } else {
            res.status(404).send(`No movies found for the year ${year}`);
        }
    } catch (error) {
        res.status(500).send('Error fetching movies by year');
    }
});

app.post('/movies', async (req, res) => {
    try {
        const newMovie = req.body;

        if (!newMovie.Title || !newMovie.Genre || !newMovie.Actors || !newMovie.Year || !newMovie.Runtime || !newMovie.Revenue) {
            return res.status(400).json({ message: 'Invalid movie data' });
        }

        const movies = await readMovies();

        const maxKey = movies.reduce((max, movie) => Math.max(max, movie.Key), 0);
        const newMovieWithKey = {
            Key: maxKey + 1,
            ...newMovie
        };

        movies.push(newMovieWithKey);

        await writeMovies(movies);

        res.status(201).json({ message: 'Movie added successfully', movie: newMovieWithKey });
    } catch (error) {
        console.error('Error adding movie:', error);
        res.status(500).send('Error adding movie');
    }
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
