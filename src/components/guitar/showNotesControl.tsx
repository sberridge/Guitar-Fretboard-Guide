import React from "react";
import { ChangeEventHandler } from "react";

type showNotesProps = {
    onChange: ChangeEventHandler<HTMLInputElement>
}

export default function ShowNotesControl({onChange}:showNotesProps) {
    return <div className="field">
        <label className="label has-text-light" htmlFor="show-notes-checkbox">Show Notes</label>
        <div className="control">
            <input className="checkbox" id="show-notes-checkbox" type="checkbox" onChange={onChange} />
        </div>
    </div>;
}