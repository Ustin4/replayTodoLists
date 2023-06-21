import React, {useState} from 'react';
import './App.css';
import {TasksType, TodoList} from "./TodoList/TodoList";
import {v1} from 'uuid';
import {AddItemFrom} from "./TodoList/AddItemFrom";

export type FilterValueType = "all" | "completed" | "active"

type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}

type TaskStateType = {
    [key: string]: TasksType[]

}

function App() {


    const deleteTasks = (id: string, todolistId: string) => {
        let tasksObj = tasks[todolistId]
        let newTasks = tasksObj.filter(t => t.id !== id)
        tasks[todolistId] = newTasks
        setTasks({...tasks})

    }

    const addTask = (title: string, todolistId: string) => {
        let newTask = {id: v1(), title: title, isDone: false}
        let tasksObj = tasks[todolistId]
        let newTasks = [newTask, ...tasksObj]
        tasks[todolistId] = newTasks
        setTasks({...tasks})
        //   setTasks([...tasks,newTasks])
    }

    const changeTasksStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        let taskObj = tasks[todolistId]
        let task = taskObj.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }

    }

    function changeFilter(value: FilterValueType, todoListId: string) {

        let todolist = todolists.find(tl => tl.id === todoListId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }

    }

    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistId1, title: "What to learn", filter: "active"},
        {id: todolistId2, title: "What to buy", filter: "completed"}
    ])

    const removeTodolist = (todolistId: string) => {
        let filteredTodolsit = todolists.filter(tl => tl.id !== todolistId)
        setTodolists(filteredTodolsit)
        delete tasks[todolistId]
        setTasks({...tasks})
    }

    let [tasks, setTasks] = useState<TaskStateType>({
        [todolistId1]: [
            {id: v1(), title: "CSS&HTML", isDone: true},
            {id: v1(), title: "JS ", isDone: false},
            {id: v1(), title: "React", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "Book", isDone: true},
            {id: v1(), title: "cucumber", isDone: false},

        ]

    })

    const addTodolist = (title: string) => {
        let todolist: TodolistType = {
            id: v1(),
            title: title,
            filter: "active"
        }
        setTodolists([todolist, ...todolists])
        setTasks({
            ...tasks,
            [todolist.id]: []
        })
    }

    const changeTaskTitle = (taskId: string, newTitle: string, todolistId: string) => {
        let taskObj = tasks[todolistId]
        let task = taskObj.find(t => t.id === taskId)
        if (task) {
            task.title = newTitle
            setTasks({...tasks})
        }
    }

    const changeTodolistTitle = (newTitle: string, todolistId: string) => {
        const todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.title = newTitle
            setTodolists([...todolists])
        }
    }

    return (
        <div className="App">
            <AddItemFrom addItem={addTodolist}/>
            {
                todolists.map((tl) => {

                    let tasksForTodolist = tasks[tl.id];
                    if (tl.filter === "completed") {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone)
                    }
                    if (tl.filter === "active") {
                        tasksForTodolist = tasksForTodolist.filter(t => !t.isDone)
                    }

                    return <TodoList
                        key={tl.id}
                        todoId={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        deleteTasks={deleteTasks}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTasksStatus={changeTasksStatus}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                        changeTaskTitle={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                })
            }


        </div>
    );
}

export default App;
