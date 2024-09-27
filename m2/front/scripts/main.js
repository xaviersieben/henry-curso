import axios from "axios";
import { loadNavFooter } from "./loadNavFooter.js";
import { Repository } from "./repository.js";
import { createMovieCard, clearMoviesContainer } from "./ui.js";

loadNavFooter();

const addMovieButton = $("#addMovieButton");
let moviesData = [];
const repository = new Repository();

const refresh = () => {
  clearMoviesContainer();

  const moviesContainer = $("#moviesContainer");
  repository.getAllMovies().forEach((movie) => {
    const card = createMovieCard(movie);

    moviesContainer.append(card);
  });
};

const getMovies = async () => {
  try {
    const response = await axios.get("http://localhost:3000/movies");
    moviesData = response.data;
    moviesData.forEach((e) => {
      repository.createMovie(e);
    });
    refresh();
  } catch (error) {
    console.error("Error al obtener las películas:", error);
  }
};

getMovies();
