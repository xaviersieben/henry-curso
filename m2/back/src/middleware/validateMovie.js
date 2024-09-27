export const validateMovie = (req, res, next) => {
  const { title, year, director, rate } = req.body;

  // Validación de campos obligatorios
  if (!title || !year || !director || !rate) {
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios." });
  }
  next();
};
