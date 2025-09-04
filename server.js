const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const PORT = 3000;
const DB_FILE = path.join(__dirname, "db.json");

//fonction pour lire la BDD
function readDB(){
    try {
        const data = fs.readFileSync(DB_FILE, "utf8");
    return JSON.parse(data);
    } 
    catch (err) {
        return { tasks: [] };
    }
}

//fonction pour écrire dans la BDD
function writeDB(data){
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2))
}



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
    const db = readDB();
  res.json(db.tasks);
});

// Ajouter une tâche
app.post("/tasks", (req, res) => {
  const { task } = req.body;
  if (task) {
    const db = readDB();
    db.tasks.push(task);
    writeDB(db);
    res.json({ success: true, tasks });
  } else {
    res.status(400).json({ success: false, message: "Task required" });
  }
});

// Supprimer une tâche par index
app.delete("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const db = readDB();
  if (id >= 0 && id < tasks.length) {
    db.tasks.splice(id, 1);
    writeDB(db);
    res.json({ success: true, tasks });
  } else {
    res.status(404).json({ success: false, message: "Not found" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});