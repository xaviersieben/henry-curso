// movieForm.js

// Limpiar el formulario usando jQuery
export function clearForm() {
  $("#movieForm")[0].reset();
}

// Manejo del formulario con jQuery
$("#movieForm").on("submit", async function (event) {
  event.preventDefault();

  const formData = {
    title: $("#title").val(),
    year: $("#year").val(),
    director: $("#director").val(),
    rate: $("#rate").val(),
  };

  try {
    const response = await fetch("http://localhost:3000/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
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
    alert("Ocurrió un error al crear la película. Por favor, inténtalo nuevamente.");
  }
});

// Botón para limpiar el formulario
$("#clearButton").on("click", function () {
  clearForm();
});

