import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/todos/todoSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Form = () => {
  const [todo, setTodo] = useState("");
  const dispatch = useDispatch();

  const handleInput = (e) => {
    setTodo(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTodo(todo));
    setTodo("");
    toast.success("Task Added");
  };
  return (
    <div className="w-full">
      {/* <!-- component --> */}
      <div className="-space-x-2 mx-auto ">
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            className="border placeholder-gray-400 focus:outline-none
            focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
            border-gray-300 rounded-md"
            type="text"
            value={todo}
            onChange={(e) => handleInput(e)}
          />

          <button
            className="w-full inline-block pt-2 mt-1 pr-5 pb-2 pl-5 text-xl font-medium text-center text-white bg-indigo-500
            rounded-lg transition duration-200 disabled:bg-indigo-300 disabled:cursor-not-allowed hover:bg-indigo-600 ease"
            onClick={(e) => handleSubmit(e)}
            disabled={(todo.trim().length > 0)?false:true}
            type="submit"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
