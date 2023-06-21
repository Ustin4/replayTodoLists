import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
onChange:(newValue:string)=>void
}
export const EditableSpan = (props: EditableSpanPropsType) => {
    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState("")

    const activateEditModeHandler = () => {
        setEditMode(!editMode)
        setTitle(props.title)
    }

    const activateVieModeHandler = () => {
        setEditMode(!editMode)
        props.onChange(title)
    }

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
       setTitle(e.currentTarget.value)
    }

    return editMode
        ? <input value={title}
                 onChange={onChangeTitleHandler}
                 onBlur={activateVieModeHandler}
                 autoFocus
        />
        : <span onDoubleClick={activateEditModeHandler}>{props.title}</span>
}