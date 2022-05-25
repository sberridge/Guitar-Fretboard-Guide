import React from "react";
import { ChangeEventHandler } from "react";

type tuningSelectProps = {
    onChange: ChangeEventHandler<HTMLSelectElement>
}

export default function TuningSelect({onChange}:tuningSelectProps) {
    return <div className="field">
        <label htmlFor="tuning-select" className="label has-text-light">Tuning</label>
        <div className="control">
            <select id="tuning-select" className="select" onChange={onChange}>
                <option value="standard">Standard</option>
                <option value="dropd">Drop D</option>
                <option value="ddropd">Double Drop D</option>
                <option value="dadgad">DADGAD</option>
                <option value="opend">Open D</option>
            </select>
        </div>
    </div>;
}