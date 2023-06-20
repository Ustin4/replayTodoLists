import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValueType} from "../App";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    todoId:string
    title: string
    tasks: TasksType[]
    deleteTasks: (id: string,todolistId:string) => void
    changeFilter: (value: FilterValueType,todoListId:string) => void
    addTask: (title: string,todolistId:string) => void
    changeTasksStatus: (taskId: string, isDone: boolean,todolistId:string) => void
    filter:FilterValueType
    removeTodolist:(todolistId:string)=>void
}


export function TodoList(props: TodoListPropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (newTaskTitle.trim() !== "") {
            props.addTask(newTaskTitle , props.todoId)
            setNewTaskTitle("")
        } else {
            setError("Title is required")
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            addTask()
        }
    }
    const onAllClickHandler = () => {
        props.changeFilter("all", props.todoId)
    }
    const onActiveClickHandler = () => {
        props.changeFilter("active",props.todoId)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter("completed",props.todoId)
    }

    const removeTodolist =()=>{
    props.removeTodolist(props.todoId)

    }

    return (
        <div>
            <h3>{props.title} <button onClick={removeTodolist}>x</button></h3>
            <div>

                <input
                    value={newTaskTitle}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                    className={error ? "error" : ''}
                />

                <button onClick={addTask}>x</button>
                {error && <div className="error-message">{error}</div>}
            </div>

            <ul>

                {

                    props.tasks.map(t => {

                        const onChangeTasksStatusHandler =
                            (e: ChangeEvent<HTMLInputElement>) => {
                                props.changeTasksStatus(t.id, e.currentTarget.checked , props.todoId)
                            }

                        const onRemoveHandler = () => {
                            props.deleteTasks(t.id , props.todoId)
                        }

                        return <li key={t.id}><input
                            type="checkbox"
                            checked={t.isDone}
                            onChange={onChangeTasksStatusHandler}/>
                            <span>{t.title} </span>
                            <button onClick={onRemoveHandler}>x</button>
                        </li>
                    })

                }


            </ul>
            <div>
                <button className={props.filter === "all"? "active-filter":''}
                        onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter === "active" ? "active-filter":'' }
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter === "completed" ? "active-filter":'' }
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>

        </div>


    )
}