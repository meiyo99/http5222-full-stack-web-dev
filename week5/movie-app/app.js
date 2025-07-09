const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/moviedb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Movie Schema
const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    year: {
        type: Number,
        required: true
    },
    rating: {
        type: String,
        required: true
    }
});

const Movie = mongoose.model('Movie', movieSchema);

// Initialize data function
async function initializeMovies() {
    try {
        const count = await Movie.countDocuments();
        if (count === 0) {
            const movies = [
                { title: "The Shawshank Redemption", year: 1994, rating: "R" },
                { title: "The Lion King", year: 1994, rating: "G" },
                { title: "Pulp Fiction", year: 1994, rating: "R" },
                { title: "Toy Story", year: 1995, rating: "G" },
                { title: "The Dark Knight", year: 2008, rating: "PG-13" },
                { title: "Finding Nemo", year: 2003, rating: "G" }
            ];
            
            await Movie.insertMany(movies);
            console.log('Sample movies inserted successfully');
        }
    } catch (error) {
        console.error('Error initializing movies:', error);
    }
}

// Function to update movie rating by title
async function updateMovieRating(title, newRating) {
    try {
        const result = await Movie.updateOne(
            { title: title },
            { $set: { rating: newRating } }
        );
        return result;
    } catch (error) {
        console.error('Error updating movie rating:', error);
        throw error;
    }
}

// Function to delete movies by rating
async function deleteMoviesByRating(rating) {
    try {
        const result = await Movie.deleteMany({ rating: rating });
        return result;
    } catch (error) {
        console.error('Error deleting movies by rating:', error);
        throw error;
    }
}

// Routes

// Home page - Display all movies
app.get('/', async (req, res) => {
    try {
        await initializeMovies(); // Initialize data if not already done
        const movies = await Movie.find({});
        res.render('index', { movies: movies });
    } catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).send('Error fetching movies');
    }
});

// Update movie rating route (demo with hardcoded values)
app.get('/update', async (req, res) => {
    try {
        // Hardcoded example: Update "The Lion King" rating to "PG"
        const result = await updateMovieRating("The Lion King", "PG");
        
        if (result.matchedCount > 0) {
            res.send(`
                <h2>Update Successful!</h2>
                <p>Movie rating updated successfully.</p>
                <p>Matched: ${result.matchedCount} document(s)</p>
                <p>Modified: ${result.modifiedCount} document(s)</p>
                <a href="/">Back to Home</a>
            `);
        } else {
            res.send(`
                <h2>Update Failed</h2>
                <p>No movie found with the specified title.</p>
                <a href="/">Back to Home</a>
            `);
        }
    } catch (error) {
        console.error('Error updating movie:', error);
        res.status(500).send('Error updating movie');
    }
});

// Delete movie by rating route (demo with hardcoded values)
app.get('/delete', async (req, res) => {
    try {
        // Hardcoded example: Delete all movies with "R" rating
        const result = await deleteMoviesByRating("R");
        
        res.send(`
            <h2>Delete Operation Complete!</h2>
            <p>Deleted ${result.deletedCount} movie(s) with rating "R"</p>
            <a href="/">Back to Home</a>
        `);
    } catch (error) {
        console.error('Error deleting movies:', error);
        res.status(500).send('Error deleting movies');
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});