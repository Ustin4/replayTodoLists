import React, {useState} from 'react';
import './App.css';
import {TasksType, TodoList} from "./TodoList/TodoList";
import {v1} from 'uuid';

export type FilterValueType = "all" | "completed" | "active"


function App() {

    let [tasks, setTasks] = useState<TasksType[]>([
        {id: v1(), title: "CSS&HTML", isDone: true},
        {id: v1(), title: "JS ", isDone: false},
        {id: v1(), title: "React", isDone: true}
    ])

    let [filter, setFilter] = useState<FilterValueType>('all')

    const deleteTasks = (id: string) => {
        let newTasks = tasks.filter(t => t.id !== id)
        setTasks(newTasks)

    }

    const addTask = (title: string) => {
        let newTask = {id: v1(), title: title, isDone: false}
        let newTasks = [newTask, ...tasks]
        setTasks(newTasks)
        //   setTasks([...tasks,newTasks])
    }

    const changeTasksStatus = (taskId: string, isDone: boolean) => {
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
        }
        setTasks([...tasks])
    }

    function changeFilter(value: FilterValueType) {
        setFilter(value)
    }

    let tasksForTodolist = tasks;
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone === true)
    }
    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => t.isDone === false)
    }


    return (
        <div className="App">
            <TodoList title="Hi"
                      tasks={tasksForTodolist}
                      deleteTasks={deleteTasks}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTasksStatus={changeTasksStatus}
            />

        </div>
    );
}

export default App;
