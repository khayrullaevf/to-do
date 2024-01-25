import { createSlice } from "@reduxjs/toolkit";
const loadTodosFromLocalStorage = () => {
  try {
    const todos = localStorage.getItem("todos");
    return todos ? JSON.parse(todos) : [];
  } catch (error) {
    console.error("Error loading todos from localStorage", error);
    return [];
  }
};

const saveTodosToLocalStorage = (todos) => {
  try {
    localStorage.setItem("todos", JSON.stringify(todos));
  } catch (error) {
    console.error("Error saving todos to localStorage", error);
  }
};

const initialState = loadTodosFromLocalStorage();
const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: state.length + 1,
        text: action.payload.text,
        time: action.payload.time,
        isDone: false,
        createAt: new Date().toLocaleString(),
      };
      state.push(newTodo);
      saveTodosToLocalStorage(state);
    },
    removeTodo: (state, action) => {
      const filteredTodos = state.filter((todo) => todo.id !== action.payload);
      saveTodosToLocalStorage(filteredTodos);
      return filteredTodos;
    },
    updateStatus: (state, action) => {
      const { id } = action.payload;
      const updateAt = new Date().toLocaleString();

      // Find the index of the todo to update
      const todoIndex = state.findIndex((todo) => todo.id === id);

      // Update the todo if found
      if (todoIndex !== -1) {
        state[todoIndex] = { ...state[todoIndex], isDone: true, updateAt };
        saveTodosToLocalStorage(state);
      }
    },
   
  },
});


export const{addTodo,removeTodo,updateStatus,}=todoSlice.actions
export default todoSlice.reducer