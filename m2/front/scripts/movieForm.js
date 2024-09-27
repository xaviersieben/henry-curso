// Función para limpiar el formulario
export function clearForm() {
  document.getElementById("movieForm").reset();
}

// Manejar el evento de envío del formulario
document
  .getElementById("movieForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const title = formData.get("title");
    const year = formData.get("year");
    const director = formData.get("director");
    const rate = formData.get("rate");

    const newMovie = { title, year, director, rate };

    try {
      const response = await fetch("http://localhost:3000/movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMovie),
      });

      if (response.ok) {
        alert("Película creada exitosamente");
        clearForm();
      } else {
        const data = await response.json();
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error al crear la película:", error);
      alert(
        "Ocurrió un error al crear la película. Por favor, inténtalo nuevamente."
      );
    }
  });
