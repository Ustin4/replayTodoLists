import React, {ChangeEvent} from "react";
import {FilterValueType} from "../App";
import {AddItemFrom} from "./AddItemFrom";
import {EditableSpan} from "./EditableSpan";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    todoId: string
    title: string
    tasks: TasksType[]
    deleteTasks: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValueType, todoListId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTasksStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    filter: FilterValueType
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle:(newTitle: string,todolistId: string) =>void
}


export function TodoList(props: TodoListPropsType) {

    const onAllClickHandler = () => {
        props.changeFilter("all", props.todoId)
    }
    const onActiveClickHandler = () => {
        props.changeFilter("active", props.todoId)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter("completed", props.todoId)
    }
    const removeTodolist = () => {
        props.removeTodolist(props.todoId)

    }
    const addTask = (title: string) => {
        props.addTask(title, props.todoId)
    }

    const onChangeTitleTodoListHandler = (newTitle: string) => {
        props.changeTodolistTitle(newTitle, props.todoId)

    }
    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={onChangeTitleTodoListHandler}/>
                <button onClick={removeTodolist}>x</button>
            </h3>

            <AddItemFrom addItem={addTask}/>
            <ul>
                {
                    props.tasks.map(t => {

                        const onChangeTasksStatusHandler =
                            (e: ChangeEvent<HTMLInputElement>) => {
                                props.changeTasksStatus(t.id, e.currentTarget.checked, props.todoId)
                            }
                        const onChangeTitleHandler = (newValue: string) => {

                            props.changeTaskTitle(t.id, newValue, props.todoId)

                        }

                        const onRemoveHandler = () => {
                            props.deleteTasks(t.id, props.todoId)
                        }

                        return <li key={t.id}><input
                            type="checkbox"
                            checked={t.isDone}
                            onChange={onChangeTasksStatusHandler}/>

                            <EditableSpan title={t.title}
                                          onChange={onChangeTitleHandler}/>

                            <button onClick={onRemoveHandler}>x</button>
                        </li>
                    })

                }

            </ul>
            <div>
                <button className={props.filter === "all" ? "active-filter" : ''}
                        onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter === "active" ? "active-filter" : ''}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter === "completed" ? "active-filter" : ''}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>

        </div>
    )
}

