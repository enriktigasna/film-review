# Film review site
Site to review your favorite movies and directors.

## Tech Stack
- Express with Prisma for backend
- PostgreSQL database
- Vue.js with Tailwind for frontend

### Frontend Routes:

| Path              | Description                         |
|-------------------|-------------------------------------|
| `/`               | Home page of the website            |
| `/reviews`        | Page listing movie reviews          |
| `/users`          | Page listing users                  |
| `/directors`      | Page listing film directors         |
| `/directors/:id`  | Detailed view of a specific director|
| `/movies/:id`     | Detailed view of a specific movie   |
| `/users/:name`    | Detailed view of a specific user    |

### Backend Routes

| Method   | Path                     | Description                                       |
|----------|--------------------------|---------------------------------------------------|
| POST     | `/movies`                | Create a new movie                                |
| POST     | `/reviews`               | Create a new review                               |
| POST     | `/directors`             | Create a new director                             |
| GET      | `/directors`             | Get all directors with aggregated data            |
| GET      | `/movies`                | Get all movies with directors included            |
| GET      | `/directors/:id`         | Get a specific director with their movies         |
| GET      | `/reviews`               | Get all reviews, supports pagination              |
| GET      | `/users/:name`           | Get all reviews by a specific user                |
| DELETE   | `/directors/:id`         | Delete a specific director                        |
| DELETE   | `/movies/:id`            | Delete a specific movie                           |
| GET      | `/movies/:id`            | Get a specific movie with details and reviews     |
| DELETE   | `/reviews/:id`           | Delete a specific review                          |
| GET      | `/users`                 | Get user stats (number of ratings, average rating)|