async function loadTasks() {
        const res = await fetch("/tasks");
        const data = await res.json();
        document.getElementById("taskList").innerHTML = data.map(
          (t, i) => `<li>- ${t} <button onclick="deleteTask(${i})">❌</button></li>`
        ).join("");
      }

      async function addTask() {
        const task = document.getElementById("taskInput").value;
        await fetch("/tasks", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({ task })
        });
        document.getElementById("taskInput").value = "";
        loadTasks();
      }

      async function deleteTask(i) {
        await fetch("/tasks/" + i, { method: "DELETE" });
        loadTasks();
      }

      loadTasks();