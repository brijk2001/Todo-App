import { useState } from "react";
import { Trash2, Edit, Check, AlertCircle } from "lucide-react";
import "./styles/globals.css";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState("all"); // all, active, completed
  const [priority, setPriority] = useState("medium"); // low, medium, high

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    if (editId !== null) {
      setTodos(
        todos.map((todo) =>
          todo.id === editId ? { ...todo, text: inputValue } : todo
        )
      );
      setEditId(null);
    } else {
      const newTodo = {
        id: Date.now(),
        text: inputValue,
        completed: false,
        priority,
        createdAt: new Date(),
      };
      setTodos([...todos, newTodo]);
    }
    setInputValue("");
  };

  const handleEdit = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    setInputValue(todoToEdit.text);
    setEditId(id);
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "priority-high";
      case "low":
        return "priority-low";
      default:
        return "priority-medium";
    }
  };

  return (
    <div className="container">
      <h1 className="title">Todo List</h1>

      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add a new task..."
            className="input"
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="select"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <button type="submit" className="button">
            {editId !== null ? "Update" : "Add"}
          </button>
        </div>
      </form>

      <div className="filters">
        <button
          onClick={() => setFilter("all")}
          className={`filter-button ${filter === "all" ? "active" : ""}`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("active")}
          className={`filter-button ${filter === "active" ? "active" : ""}`}
        >
          Active
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`filter-button ${filter === "completed" ? "active" : ""}`}
        >
          Completed
        </button>
      </div>

      {filteredTodos.length === 0 ? (
        <div className="no-tasks">
          <AlertCircle />
          No tasks found
        </div>
      ) : (
        <ul className="todo-list">
          {filteredTodos.map((todo) => (
            <li
              key={todo.id}
              className={`todo-item ${todo.completed ? "completed" : ""}`}
            >
              <div className="todo-content">
                <button
                  onClick={() => toggleComplete(todo.id)}
                  className="check-button"
                >
                  {todo.completed && <Check />}
                </button>
                <span
                  className={`todo-text ${
                    todo.completed ? "strike-through" : ""
                  }`}
                >
                  {todo.text}
                </span>
                <span className={getPriorityColor(todo.priority)}>
                  {todo.priority}
                </span>
              </div>
              <div className="actions">
                <button
                  onClick={() => handleEdit(todo.id)}
                  className="edit-button"
                  disabled={todo.completed}
                >
                  <Edit />
                </button>
                <button
                  onClick={() => handleDelete(todo.id)}
                  className="delete-button"
                >
                  <Trash2 />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoApp;
