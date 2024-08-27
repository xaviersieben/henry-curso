class Activity {
    constructor({ id, title, description, imgUrl }) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.imgUrl = imgUrl;
    }
  }
  
  class Repository {
    constructor() {
      this.activities = [];
      this.currentId = 0;
    }
  
    getAllActivities() {
      return [...this.activities]; // Returns a shallow copy to avoid direct manipulation
    }
  
    createActivity({ title, description, imgUrl }) {
      const activity = new Activity({
        id: ++this.currentId, // Increment and assign in one step
        title,
        description,
        imgUrl,
      });
      this.activities.push(activity);
      return activity;
    }
  
    deleteActivity(id) {
      this.activities = this.activities.filter(activity => activity.id !== id);
    }
  }
  
  function createActivityCard(activity, repository) {
    const activityContainer = document.getElementById("activity-container");

    console.log(activity,repository)
  
    const card = document.createElement("div");
    card.classList.add("activity-card");
  
    card.innerHTML = `
      <h2>${activity.title}</h2>
      <p>${activity.description}</p>
      <img src="${activity.imgUrl}" alt="${activity.title}" />
      <button class="delete-button">Delete</button>
    `;
  
    card.querySelector('.delete-button').addEventListener("click", () => {
      repository.deleteActivity(activity.id);
      card.remove();
    });
  
    activityContainer.appendChild(card);
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const repository = new Repository(); // Define `repository` dentro del `DOMContentLoaded`
    const form = document.getElementById("form");
  
    form.addEventListener("submit", (event) => {
      event.preventDefault();
  
      const title = document.getElementById("text").value.trim();
      const description = document.getElementById("description").value.trim();
      const imgUrl = document.getElementById("imgUrl").value.trim();
  
      if (!title || !description || !imgUrl) {
        alert("Por favor, complete todos los campos del formulario.");
        return;
      }
  
      const activity = repository.createActivity({ title, description, imgUrl });
      createActivityCard(activity, repository); // Pasa `repository` como argumento
  
      form.reset();
    });
  });
  
  
