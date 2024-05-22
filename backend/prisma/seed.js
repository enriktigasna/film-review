// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Create directors
  const director1 = await prisma.director.create({
    data: { name: 'Christopher Nolan' }
  });

  const director2 = await prisma.director.create({
    data: { name: 'Martin Scorsese' }
  });

  const director3 = await prisma.director.create({
    data: { name: 'Quentin Tarantino' }
  });

  // Create movies
  const movies = await prisma.movie.createMany({
    data: [
      { name: 'Inception', director: director1.id },
      { name: 'The Dark Knight', director: director1.id },
      { name: 'The Irishman', director: director2.id },
      { name: 'Pulp Fiction', director: director3.id },
    ]
  });

  // Create reviews
  // Assuming there are 3 users reviewing each movie
  const users = ['User1', 'User2', 'User3'];
  const reviews = [];

  for (let movieId = 1; movieId <= 4; movieId++) {
    users.forEach(user => {
      reviews.push({
        review: `Review from ${user} for movie ${movieId}`,
        name: user,
        score: Math.floor(Math.random() * 5) + 1, // Random score between 1 and 5
        movie: movieId
      });
    });
  }

  await prisma.review.createMany({
    data: reviews
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

