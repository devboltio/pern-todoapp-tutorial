import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const HOST = "http://localhost:3000/todos/";
  const [state, setState] = useState([]);
  const [input, setInput] = useState("");

  const fetchTodos = async () => {
    const response = await axios.get(HOST);
    const todos = response.data;
    todos.sort((a, b) => {
      return a.id - b.id;
    });
    setState(todos);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    const response = await axios.post(HOST, { title: input });
    setState((state) => [...state, response.data]);
    setInput("");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addTodo();
  };

  const toggleComplete = async (todo) => {
    const { id, completed } = todo;
    await axios.put(HOST + id, { completed: !completed });
    await fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(HOST + id);
    await fetchTodos();
  };

  const todos = state.map((todo) => {
    return (
      <div key={todo.id}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleComplete(todo)}
        />
        {todo.title}{" "}
        <button onClick={() => deleteTodo(todo.id)}> DELETE </button>
      </div>
    );
  });

  return (
    <>
      <form onSubmit={onSubmit}>
        <input value={input} onChange={(e) => setInput(e.target.value)} />
        <input type="submit" />
      </form>
      {todos}
    </>
  );
}

export default App;
