import React from "react";
import { ChangeEventHandler } from "react";
import { Tunings } from "./../../lib/tunings";

type tuningSelectProps = {
    onChange: ChangeEventHandler<HTMLSelectElement>
}

export default function TuningSelect({onChange}:tuningSelectProps) {
    return <div className="field">
        <label htmlFor="tuning-select" className="label has-text-light">Tuning</label>
        <div className="control">
            <select id="tuning-select" className="select" onChange={onChange}>
                <option value={Tunings.standard}>Standard</option>
                <option value={Tunings.dropd}>Drop D</option>
                <option value={Tunings.ddropd}>Double Drop D</option>
                <option value={Tunings.dadgad}>DADGAD</option>
                <option value={Tunings.opend}>Open D</option>
            </select>
        </div>
    </div>;
}