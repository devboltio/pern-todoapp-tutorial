import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const HOST = "http://localhost:3000/todos";
  const [state, setState] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await axios.get(HOST);
      setState(response.data);
    };
    fetchTodos();
  }, []);

  const todos = state.map((todo) => {
    return (
      <div>
        {todo.title}
        {" - " + (todo.completed ? "completed" : "incomplete")}
      </div>
    );
  });

  return <>{todos}</>;
}

export default App;
