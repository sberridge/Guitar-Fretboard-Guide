type fretProps = {
    note: string
    visible: boolean
    octave: number
}

export default function Fret(props:fretProps) {
    let noteClasses = [
        "note"
    ];
    if(props.visible) {
        noteClasses.push("show");
    }
    return <div className="fret">
        <div className="fret-string"></div>
        <div className={noteClasses.join(" ")}>
            <span>{props.note}</span>
            <div className="note-scale-num"></div>
        </div>
    </div>
}