const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Route to create a movie
app.post('/movies', async (req, res) => {
  const { movieName, director } = req.body;
  try {
    const movie = await prisma.movie.create({
      data: { movieName, director }
    });
    res.json(movie);
  } catch (error) {
    console.error('Failed to create a movie:', error);
    res.status(500).send('Failed to create a movie');
  }
});

// Route to create a review
app.post('/reviews', async (req, res) => {
  const { review, name, score, movieId } = req.body;
  try {
    const newReview = await prisma.review.create({
      data: { review, name, score, movie: movieId }
    });
    res.json(newReview);
  } catch (error) {
    console.error('Failed to create a review:', error);
    res.status(500).send('Failed to create a review');
  }
});

// Route to get all movies
app.get('/movies', async (req, res) => {
  try {
    const movies = await prisma.movie.findMany();
    res.json(movies);
  } catch (error) {
    console.error('Failed to retrieve movies:', error);
    res.status(500).send('Failed to retrieve movies');
  }
});

// Route to get all reviews (paginated)
app.get('/reviews', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  try {
    const reviews = await prisma.review.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    res.json(reviews);
  } catch (error) {
    console.error('Failed to retrieve reviews:', error);
    res.status(500).send('Failed to retrieve reviews');
  }
});

// Route to get reviews by user
app.get('/reviews/user', async (req, res) => {
  const { name } = req.query;
  try {
    const reviews = await prisma.review.findMany({
      where: { name }
    });
    res.json(reviews);
  } catch (error) {
    console.error('Failed to retrieve reviews by user:', error);
    res.status(500).send('Failed to retrieve reviews by user');
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});