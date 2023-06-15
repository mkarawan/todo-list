import React from 'react';
import "./App.css";
export default function Todo({ todo, toggleTodo }) {
    function handleTodoClick(){
        toggleTodo(todo.id)
    }
    return (
            <label className={"todo"}>{todo.name}
                <input className={"checkbox"} type="checkbox" checked={todo.complete} onChange={handleTodoClick}/>
                <span className={"checkmark"}></span>
            </label>

    );
}

