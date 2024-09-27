class Movie {
  constructor(title, year, director, rate) {
    this.title = title;
    this.year = year;
    this.director = director;
    this.rate = rate;
  }
}

class Repository {
  constructor() {
    this.movies = [];
  }

  createMovie({ title, year, director, rate }) {
    const newMovie = new Movie(title, year, director, rate);
    this.movies.push(newMovie);
  }

  getAllMovies() {
    return this.movies;
  }
}

export { Movie, Repository };
