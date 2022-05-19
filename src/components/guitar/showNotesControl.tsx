import React from "react";
import { ChangeEventHandler } from "react"

type showNotesProps = {
    onChange: ChangeEventHandler<HTMLInputElement>
}

export default function ShowNotesControl({onChange}:showNotesProps) {
    return <div>
        <h3>Show Notes</h3>
        <input type="checkbox" onChange={onChange} />
    </div>
}