import { useState } from "react";

interface Todo {
  id: string;
  title: string;
}

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");

  return (
    <div>
      <h1>Todo App</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a todo"
      />
      <button>Add</button>

      {/* TODO: render the list of todos here */}
    </div>
  );
}
