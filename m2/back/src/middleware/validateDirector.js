export const validateDirector = (req, res, next) => {
  const { name, yearOfBirth } = req.body;

  // Validación de campos obligatorios
  if (!name || !yearOfBirth) {
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios." });
  }
  next();
};
