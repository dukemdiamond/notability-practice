# Todo App: React + TypeScript Interview Practice

Practice repo for a CoderPad-style technical question. In the real interview, all work happens in `src/App.tsx`.

## Getting started

Requires Node 18+.

```bash
git clone https://github.com/dukemdiamond/notability-practice.git
cd notability-practice
npm install
npm run dev
```

Then open http://localhost:5173.

- `http://localhost:5173/` shows the **starter** (`src/App.tsx`). Edit this file.
- `http://localhost:5173/?solution` shows the **finished solution** (`src/App.solution.tsx`).

Vite hot-reloads, so saved changes show up right away.

## Files

| File | What it is |
| --- | --- |
| `src/App.tsx` | Starter code. Work here. |
| `src/App.solution.tsx` | Reference solution for Parts A and B. Try it yourself first. |
| `src/main.tsx` | Entry point. Picks starter or solution based on `?solution`. |

## The question

You're given a `Todo` interface with an `id` and a `title`, plus some existing state:

```tsx
interface Todo {
  id: string;
  title: string;
}

const [todos, setTodos] = useState<Todo[]>([]);
const [input, setInput] = useState("");
```

### Part A: add todos

When the user types into the text input and clicks **Add**, add that text as a new todo and render the list below the input.

- Each todo needs a unique `id`. `crypto.randomUUID()` or `Date.now().toString()` both work.
- Clear the input after adding.
- Worth handling: ignore empty or whitespace-only input.

### Part B: toggle complete

Let the user toggle a todo between complete and incomplete. Completed items should look different (strikethrough, grayed out, etc.).

- The starter interface has no completion field, so you have to add one yourself (e.g. `completed: boolean`). Expect to talk through that change.

## Follow-up: two ways to update state

The interviewer asked about the two ways to call a state setter in React.

**1. Pass the new value directly**

```tsx
setTodos([...todos, newTodo]);
```

This uses `todos` from the current render. It's fine for a single update, but if several updates are batched together, or the setter runs inside a stale closure (a timeout, an async callback, an effect), `todos` can be out of date and you lose updates.

**2. Pass an updater function (functional update)**

```tsx
setTodos((prev) => [...prev, newTodo]);
```

React calls the function with the latest state, so updates queued back to back all apply in order. Use this whenever the next state depends on the previous one, which is the case for both adding and toggling.

Quick demo of the difference:

```tsx
// Direct value: both calls read the same stale `count`, so you get +1
setCount(count + 1);
setCount(count + 1);

// Updater: each call gets the result of the one before, so you get +2
setCount((c) => c + 1);
setCount((c) => c + 1);
```

### Other things to be ready to explain

- **Immutability.** Never `todos.push(...)` or `todo.completed = true`. React compares references, so mutating in place may not trigger a re-render. Build new arrays and objects with spread, `map`, and `filter`.
- **Toggling.** `prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t)` makes a new array and a new object for only the item that changed.
- **Keys.** Use `key={todo.id}` when rendering the list, not the array index. Index keys cause bugs once items get reordered or removed.
- **Controlled input.** `value={input}` plus `onChange` keeps React state as the source of truth for the text box.
- **Form submit.** Wrapping the input in a `<form>` with `onSubmit` + `e.preventDefault()` lets Enter add a todo too.
