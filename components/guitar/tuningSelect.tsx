import { ChangeEventHandler } from "react"

type tuningSelectProps = {
    onChange: ChangeEventHandler<HTMLSelectElement>
}

export default function TuningSelect(props:tuningSelectProps) {
    return <div>
        <h3>Tuning</h3>
        <select onChange={props.onChange}>
            <option value="standard">Standard</option>
            <option value="dropd">Drop D</option>
        </select>
    </div>
}