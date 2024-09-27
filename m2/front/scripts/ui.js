const createMovieCard = (movie) => {
  const card = $("<div>").addClass("movie-card container-fluid");

  const title = $("<h3>").text(movie.title);
  const year = $("<p>").text(`Year: ${movie.year}`);
  const director = $("<p>").text(`Director: ${movie.director}`);
  const rate = $("<p>").text(`Rate: ${movie.rate}`);
  const poster = $("<img>")
    .addClass("movie-poster")
    .attr({
      src: movie.poster,
      alt: `${movie.title} Poster`,
    });

  card.append(title, year, director, rate, poster);
  return card;
};

const clearMoviesContainer = () => {
  $("#moviesContainer").empty();
};

export { createMovieCard, clearMoviesContainer };
