import { ChangeEventHandler } from "react";
import ShowNotesControl from "./showNotesControl";
import TuningSelect from "./tuningSelect";
import styles from "./../../styles/FretboardControls.module.scss";

type fretboardControlProps = {
    onTuningChange: ChangeEventHandler<HTMLSelectElement>
    onShowNotesChange: ChangeEventHandler<HTMLInputElement>
}

export default function FretboardControls(props:fretboardControlProps) {
    return <div className={styles["fretboard-controls"]}>
        <div className={styles["fretboard-controls__control"]}>
            <TuningSelect
                onChange={props.onTuningChange}
            ></TuningSelect>
        </div>
        <div className={styles["fretboard-controls__control"]}>
            <ShowNotesControl
                onChange={props.onShowNotesChange}
            ></ShowNotesControl>
        </div>
    </div>
}