import React from "react";
import { ChangeEventHandler } from "react"

type showNotesProps = {
    onChange: ChangeEventHandler<HTMLInputElement>
}

export default function ShowNotesControl(props:showNotesProps) {
    return <div>
        <h3>Show Notes</h3>
        <input type="checkbox" onChange={props.onChange} />
    </div>
}