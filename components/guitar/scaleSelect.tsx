import styles from "./../../styles/FretboardControls.module.scss";
import { ChangeEventHandler } from "react"

import notes from './../../lib/notes'
import scales from './../../lib/scales'

type scaleSelectProps = {
    onScaleChange: ChangeEventHandler<HTMLSelectElement>
    onRootChange: ChangeEventHandler<HTMLSelectElement>
}

const renderNoteOpts = ()=>{
    return notes.map(note=>{
        return <option key={note} value={note}>{note}</option>
    })
}

const renderScaleOpts = ()=>{
    return Array.from(scales.entries()).map((scale,i)=>{
        return <option key={i} value={scale[1]}>{scale[0]}</option>
    });
}

export default function ScaleSelect(props:scaleSelectProps) {
    return <div className={styles["scale-control"]}>
        <h3>Scale</h3>
        <div className={styles["scale-control__controls"]}>
            <div className={styles["scale-control__control"]}>
                <h4>Root</h4>
                <select onChange={props.onRootChange}>
                    <option></option>
                    {renderNoteOpts()}
                </select>
            </div>
            <div className={styles["scale-control__control"]}>
                <h4>Scale</h4>
                <select onChange={props.onScaleChange}>
                    <option></option>
                    {renderScaleOpts()}
                </select>
            </div>
        </div>
    </div>
}