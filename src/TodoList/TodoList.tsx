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
    title: string
    tasks: TasksType[]
    deleteTasks: (id: string) => void
    changeFilter: (value: FilterValueType) => void
    addTask: (title: string) => void
    changeTasksStatus: (taskId: string, isDone: boolean) => void
}


export function TodoList(props: TodoListPropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const addTask = () => {
        if (newTaskTitle.trim() !== "") {
            props.addTask(newTaskTitle)
            setNewTaskTitle("")
        } else {
            setError("Title is required")
        }
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            addTask()
        }
    }
    const onAllClickHandler = () => {
        props.changeFilter("all")
    }
    const onActiveClickHandler = () => {
        props.changeFilter("active")
    }
    const onCompletedClickHandler = () => {
        props.changeFilter("completed")
    }

    return (
        <div>
            <h3>{props.title}</h3>
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
                                props.changeTasksStatus(t.id, e.currentTarget.checked)
                            }

                        const onRemoveHandler = () => {
                            props.deleteTasks(t.id)
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
                <button className={""} onClick={onAllClickHandler}>All
                </button>
                <button onClick={onActiveClickHandler}>Active
                </button>
                <button onClick={onCompletedClickHandler}>Completed
                </button>
            </div>

        </div>


    )
}