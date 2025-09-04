const express = require("express");
const app = express();
const path = require("path");
const PORT = 3000;
// Servir index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});


// Middleware pour lire le JSON
app.use(express.json());

// Tableau en mémoire (pas de base de données pour ce test)
let tasks = ["Revoir React", "Préparer entretien"];

// Récupérer toutes les tâches
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// Ajouter une tâche
app.post("/tasks", (req, res) => {
  const { task } = req.body;
  if (task) {
    tasks.push(task);
    res.json({ success: true, tasks });
  } else {
    res.status(400).json({ success: false, message: "Task required" });
  }
});

// Supprimer une tâche par index
app.delete("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (id >= 0 && id < tasks.length) {
    tasks.splice(id, 1);
    res.json({ success: true, tasks });
  } else {
    res.status(404).json({ success: false, message: "Not found" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});