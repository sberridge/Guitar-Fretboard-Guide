import { ChangeEventHandler } from "react";
import TuningSelect from "./tuningSelect";

type fretboardControlProps = {
    onTuningChange: ChangeEventHandler<HTMLSelectElement>
}

export default function FretboardControls(props:fretboardControlProps) {
    return <div className="fretboard-controls">
        <div className="fretboard-controls__control">
            <TuningSelect
                onChange={props.onTuningChange}
            ></TuningSelect>
        </div>
    </div>
}