import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) setTasks(JSON.parse(savedTasks));
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask(e) {
    e.preventDefault();
    if (newTask.trim() === "") return;

    setTasks([...tasks, { text: newTask, completed: false }]);
    setNewTask("");
  }

  function removeTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  function toggleCompleted(index) {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  }

  return (
    <div className="container">
      <h1 className="title">Todo List</h1>

      <form className="form" onSubmit={addTask}>
        <input
          type="text"
          placeholder="Add a task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="input"
        />
        <button type="submit" className="btn">Add</button>
      </form>

      <ul className="task-list">
        {tasks.map((task, index) => (
          <li
            key={index}
            className={`task-item ${task.completed ? "completed" : ""}`}
          >
            <span className="task-text">{task.text}</span>

          
            <div className="btn-group">
              <button
                className="complete-btn"
                onClick={() => toggleCompleted(index)}
              >
                {task.completed ? "Undo" : "Complete"}
              </button>

              <button
                className="remove-btn"
                onClick={() => removeTask(index)}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;




