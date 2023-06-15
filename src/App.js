import React, {useState, useRef, useEffect} from "react";
import TodoList from "./TodoList";
import {v4 as uuidv4} from 'uuid';
import "./App.css";


const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
    const [todos, setTodos] = useState([]);
    const todoNameRef = useRef();

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        if (storedTodos) setTodos(prevTodos=>[...prevTodos, ...storedTodos]);
    }, [])

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
    }, [todos])

    function toggleTodo(id){
        const newTodos = [...todos];
        const todo = newTodos.find(todo => todo.id === id)
        todo.complete = !todo.complete
        setTodos(newTodos)
    }
    function handleAddTodo(e) {
        const name = todoNameRef.current.value
        if (name === '') return
        setTodos(prevTodos => {
            return [...prevTodos, {id: uuidv4(), name: name, complete: false}]
        })
        todoNameRef.current.value = null
    }
    function handleClearTodo(){
        const newTodos =  todos.filter(todo => !todo.complete)
        setTodos(newTodos)
    }
    return (
        <>
            <div className={"box"}>
            <h1 className={"header"}>TO DO LIST</h1>
            <div className={"todos"}> <TodoList todos={todos} toggleTodo={toggleTodo}/></div>
            <div className={"left-amount"}>{todos.filter(todo => !todo.complete).length} left to do</div>
            <div className={"add-todo"}>
                <input className={"input"} ref={todoNameRef} type="text"/>
                <button className={"button"} onClick={handleAddTodo}>Add ToDo</button>
            </div>
            <button className={"button clear-button"} onClick={handleClearTodo}>Clear Completed</button>
            </div>

        </>
    )
}

export default App;
