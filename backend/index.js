const express = require("express");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");
const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

// Route to create a movie
app.post("/movies", async (req, res) => {
  const { name, director } = req.body;
  try {
    const movie = await prisma.movie.create({
      data: { name, director },
    });
    res.json(movie);
  } catch (error) {
    console.error("Failed to create a movie:", error);
    res.status(500).send("Failed to create a movie");
  }
});

// Route to create a review
app.post("/reviews", async (req, res) => {
  const { review, name, score, movie } = req.body;

  if (score < 1 || score > 5) {
    res.status(400).send("Invalid score. Score must be between 1 and 5.");
    return;
  }
  try {
    const newReview = await prisma.review.create({
      data: {
        review: review,
        name: name,
        score: score,
        Movie: {
          connect: { id: movie },
        },
      },
    });
    res.json(newReview);
  } catch (error) {
    console.error("Failed to create a review:", error);
    res.status(500).send("Failed to create a review");
  }
});

// Route to create a director
app.post("/directors", async (req, res) => {
  const { name } = req.body;
  try {
    const director = await prisma.director.create({
      data: { name },
    });
    res.json(director);
  } catch (error) {
    console.error("Failed to create a director:", error);
    res.status(500).send("Failed to create a director");
  }
});

// Route to get all directors
app.get("/directors", async (req, res) => {
  try {
    const directors = await prisma.director.findMany({
      include: {
        _count: { select: { movies: true }},
      },
    });

    const directorsWithAvgScores = await prisma.$queryRaw`
      SELECT 
        d.id,
        d.name,
        COUNT(m.id) AS count,
        AVG(r.score) AS average
      FROM 
        "Director" d
      JOIN 
        "Movie" m ON m.director = d.id
      JOIN 
        "Review" r ON r.movie = m.id
      GROUP BY 
        d.id, d.name;
    `;
    res.json(directorsWithAvgScores);
  } catch (error) {
    console.error("Failed to retrieve directors:", error);
    res.status(500).send("Failed to retrieve directors");
  }
});

// Route to get all movies
app.get("/movies", async (req, res) => {
  try {
    const movies = await prisma.movie.findMany({
      include: {
        Director: true,
      },
    });
    res.json(movies);
  } catch (error) {
    console.error("Failed to retrieve movies:", error);
    res.status(500).send("Failed to retrieve movies");
  }
});

// Route to get all reviews (paginated)
app.get("/reviews", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  try {
    const reviews = await prisma.review.findMany({
      include: {
        Movie: true,
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    res.json(reviews);
  } catch (error) {
    console.error("Failed to retrieve reviews:", error);
    res.status(500).send("Failed to retrieve reviews");
  }
});

// Route to get reviews by user
app.get("/reviews/user", async (req, res) => {
  const { name } = req.query;
  try {
    const reviews = await prisma.review.findMany({
      where: { name },
    });
    res.json(reviews);
  } catch (error) {
    console.error("Failed to retrieve reviews by user:", error);
    res.status(500).send("Failed to retrieve reviews by user");
  }
});

// Route to delete director
app.delete("/directors/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const director = await prisma.director.delete({
      where: { id: parseInt(id) },
    });
    res.json(director);
  } catch (error) {
    console.error("Failed to delete director:", error);
    res.status(500).send("Failed to delete director");
  }
});

// Route to delete movie
app.delete("/movies/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await prisma.movie.delete({
      where: { id: parseInt(id) },
    });
    res.json(movie);
  } catch (error) {
    console.error("Failed to delete movie:", error);
    res.status(500).send("Failed to delete movie");
  }
});

// Route to get one movie
app.get("/movies/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await prisma.movie.findUnique({
      where: { id: parseInt(id) },
      include: {
        Director: true,
        reviews: true,
      }
    });
    res.json(movie);
  } catch (error) {
    console.error("Failed to retrieve movie:", error);
    res.status(500).send("Failed to retrieve movie");
  }
});

// Route to delete review
app.delete("/reviews/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const review = await prisma.review.delete({
      where: { id: parseInt(id) },
    });
    res.json(review);
  } catch (error) {
    console.error("Failed to delete review:", error);
    res.status(500).send("Failed to delete review");
  }
});

// Route to get each unique user name from the reviews, along with the number of ratings and average rating
app.get("/users", async (req, res) => {
  try {
    const users = await prisma.review.groupBy({
      by: ["name"],
      _count: { score: true },
      _avg: { score: true },
      orderBy: {
        _count: {
          score: "desc",
        },
      },
    });
    res.json(users);
  } catch (error) {
    console.error("Failed to retrieve users:", error);
    res.status(500).send("Failed to retrieve users");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
