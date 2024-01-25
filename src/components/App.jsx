'use client'
import "./App.css";
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";

function App() {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center p-5">
        <div className="App">
          <h1 className="text-success"> Add your todos</h1>
          <TodoForm />
          <TodoList />
        </div>
      </div>
    </>
  );
}

export default App;
