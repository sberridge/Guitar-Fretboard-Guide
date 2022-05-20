import React from "react";
import { ChangeEventHandler } from "react";

type tuningSelectProps = {
    onChange: ChangeEventHandler<HTMLSelectElement>
}

export default function TuningSelect({onChange}:tuningSelectProps) {
    return <div>
        <h3>Tuning</h3>
        <select onChange={onChange}>
            <option value="standard">Standard</option>
            <option value="dropd">Drop D</option>
            <option value="ddropd">Double Drop D</option>
            <option value="dadgad">DADGAD</option>
            <option value="opend">Open D</option>
        </select>
    </div>;
}