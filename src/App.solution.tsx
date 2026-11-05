import { useState } from "react";

// Part B: the starter Todo only has id + title. To support toggling,
// we add a `completed` flag to the shape.
interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");

  // Part A: add a todo
  function addTodo() {
    const title = input.trim();
    if (!title) return; // ignore empty / whitespace-only input

    const newTodo: Todo = {
      id: crypto.randomUUID(), // Date.now().toString() also works
      title,
      completed: false,
    };

    // Functional update: build the next array from the latest state.
    // Never push() into the existing array; React needs a new reference.
    setTodos((prev) => [...prev, newTodo]);
    setInput("");
  }

  // Part B: toggle complete / incomplete
  function toggleTodo(id: string) {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  return (
    <div>
      <h1>Todo App</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault(); // lets Enter key add too, without a page reload
          addTodo();
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a todo"
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            onClick={() => toggleTodo(todo.id)}
            style={{
              cursor: "pointer",
              textDecoration: todo.completed ? "line-through" : "none",
              color: todo.completed ? "gray" : "inherit",
            }}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              onClick={(e) => e.stopPropagation()}
            />{" "}
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
