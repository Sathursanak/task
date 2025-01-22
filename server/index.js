import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password:"",
  database: "test"
});

app.use(express.json());
app.use(cors());

app.get('/', (req, res) =>{
  res.json("success")
}
  )
  app.get('/tasks', (req, res) => {
    const q = "SELECT * FROM tasks";
    connection.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.post('/tasks', (req, res) => {
  const q = "INSERT INTO tasks (`title`, `desc`) VALUES (?, ?)"
  const values = [req.body.title, req.body.desc]

  connection.query(q, values, (err, data) => {
    if (err) return res.json(err);
    return res.json("Task added");
  });
});

app.delete("/tasks/:id", (req, res) => {
  const taskId = req.params.id;
  const q = "delete from tasks where id= ?"
  connection.query(q, taskId, (err, data) => {
    if (err) return res.json(err);
    return res.json("Task deleted");
  });
  })

  // Get task by ID
app.get("/tasks/:id", (req, res) => {
  const taskId = req.params.id;
  const q = "SELECT * FROM tasks WHERE id = ?"; // Query to fetch the task

  connection.query(q, [taskId], (err, data) => {
    if (err) return res.json(err);
    return res.json(data[0]); // Return the first task (in case of single result)
  });
});

// Update task by ID
app.put("/tasks/:id", (req, res) => {
  const taskId = req.params.id;
  const q = "UPDATE tasks SET `title` = ?, `desc` = ? WHERE `id` = ?";  // SQL query
  
  const values = [req.body.title, req.body.desc];
  
  connection.query(q, [...values, taskId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Task updated successfully");
  });
});

  // Update task status by ID
app.put("/tasks/status/:id", (req, res) => {
  const taskId = req.params.id;
  const newStatus = req.body.status; // The new status (e.g., "Completed" or "Pending")
  
  const q = "UPDATE tasks SET `status` = ? WHERE `id` = ?";
  
  connection.query(q, [newStatus, taskId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Task status updated successfully");
  });
});


app.listen(8800, ()=>{
  console.log("Server is running on port 8800");
})