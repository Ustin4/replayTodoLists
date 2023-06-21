import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFromFromPropsType = {
    addItem: (title: string) => void

}
export const AddItemFrom = (props: AddItemFromFromPropsType) => {
    const [newTaskTitle, setNewTaskTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            addTask()
        }
    }

    const addTask = () => {
        if (newTaskTitle.trim() !== "") {
            props.addItem(newTaskTitle)
            setNewTaskTitle("")
        } else {
            setError("Title is required")
        }
    }
    return <div>

        <input
            value={newTaskTitle}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
            className={error ? "error" : ''}
        />

        <button onClick={addTask}>x</button>
        {error && <div className="error-message">{error}</div>}
    </div>

}