import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/todos/todoSlice";

const loadFromLocalStorage = () => {
  try {
    const todoData = localStorage.getItem("todos");
    if (todoData === null) return undefined;
    return JSON.parse(todoData);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
};

const saveToLocalStorage = ({ getState }) => {
    return next => action => {
      const result = next(action);
      localStorage.setItem('todos', JSON.stringify(getState()));
      return result;
    };
  };
  

export default configureStore({
  reducer: {
    todos: todoReducer,
  },
  preloadedState: loadFromLocalStorage(),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(saveToLocalStorage),
})  

