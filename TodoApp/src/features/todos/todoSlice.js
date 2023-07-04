import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";

const initialState = {
    todos:[]
}

export const todoSlice = createSlice({
    name:'todos' ,
    initialState,
    reducers:{
        addTodo:(state,action) => {
            let todo = {
                id:nanoid(),
                task:action.payload,
                complete:false,
                edit:false
            }
            state.todos.push(todo);
        },
        removeTodo:(state,action) => {
            let id = action.payload
            state.todos = state.todos.filter(item => item?.id!==id)
        },
        editTodo:(state,action) => {
            let id = action.payload 
            state.todos.map((item) => {
                if(item.id===id){
                    item.edit = !item.edit
                }
            })
        },
        updateTodo:(state,action) => {
            let {todoInput,id}  = action.payload
            state.todos.map((item) => {
                if(item.id===id){
                   item.task = todoInput
                   item.edit = false;
                }
            })
        },
        completeTodo:(state,action) => {
            let uid = action.payload
            state.todos.map((item) => {
                if(item.id===uid){
                    item.complete = !item.complete;
                }
            })
        }
    }
})

export const {addTodo,removeTodo,updateTodo,editTodo,completeTodo} = todoSlice.actions

export default todoSlice.reducer