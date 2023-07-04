import React, { useState,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, completeTodo, removeTodo,editTodo } from "../features/todos/todoSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import {HiPencil} from 'react-icons/hi'
import EditModal from "./EditModal";

const Todos = () => {
  const todos = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();
    

  const handleDelete = (todo) => {
    if(!todo) return;
    dispatch(removeTodo(todo.id));
    toast.error("Task removed");
  };

  const handleComplete = (todo) => {
    if(!todo) return;
    dispatch(completeTodo(todo?.id));
    if(!todo?.complete)toast.success("Hurray!Task Completed.")
  };

  const handleEdit = (id) => {
      dispatch(editTodo(id))
  }

  return (
    <div>
      {todos.map((todo) => (
        <div
          key={todo?.id}
          className="flex justify-between items-center m-1 font-medium py-1 px-2  rounded-md border border-purple-700"
        >
          <p className={`${todo?.complete?"text-green-400 line-through":""} break-words max-w-[70%] md:max-w-[50%] font-regular block  rounded-lg  p-4 text-base leading-5  opacity-100`}>
            {todo?.task}
          </p>
          {/* <button className="min-w-auto w-10 h-10 bg-blue-300 p-2 rounded-full hover:bg-blue-500  font-semibold"
          onClick={() => handleSubmit(todo.id)}>
            X
          </button> */}
          <div className="flex lg:flex-row  flex-col">
          <button
              className={`flex-no-shrink p-2 ml-2 mr-2 border-2 rounded hover:text-white text-green border-green-400 disabled:bg-gray-500 disabled:border-gray-500 disabled:cursor-not-allowed hover:bg-green-400 group flex relative`}
              onClick={() => handleEdit(todo.id)}
              disabled={todo?.complete}
            >
              <HiPencil />
              <span
                className="group-hover:opacity-100 z-50 transition-opacity bg-gray-800 px-3 py-2 font-medium text-sm text-gray-100 rounded-md shadow-sm dark:bg-gray-700  absolute left-1/2  -translate-x-1/2 translate-y-full opacity-0 mx-auto"
              >
                Edit
              </span>
              {console.log(todo)}
               {todo && todo.edit && <EditModal id={todo.id} task={todo.task} edit={todo.edit} /> } 
            </button>
            <button
              className="flex-no-shrink p-2 ml-2 mr-2 border-2 rounded hover:text-white text-green border-green-400 hover:bg-green-400 group flex relative"
              onClick={() => handleComplete(todo)}
            >
              <TiTick />
              <span
                className="group-hover:opacity-100 z-50 transition-opacity bg-gray-800 px-3 py-2 font-medium text-sm text-gray-100 rounded-md shadow-sm dark:bg-gray-700  absolute left-1/2  -translate-x-1/2 translate-y-full opacity-0 mx-auto"
              >
                Done
              </span>
            </button>
            <button
              className="flex-no-shrink p-2 ml-2 mr-2 border-2 rounded text-red border-red-400 hover:text-white group flex relative hover:bg-red-400"
              onClick={() => handleDelete(todo)}
            >
              <ImCross />
              <span
                className="group-hover:opacity-100 z-50 transition-opacity bg-gray-800 px-3 py-2 font-medium text-sm text-gray-100 rounded-md shadow-sm dark:bg-gray-700  absolute left-1/2  -translate-x-1/2 translate-y-full opacity-0 mx-auto"
              >
                Delete
              </span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Todos;
