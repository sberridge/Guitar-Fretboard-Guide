
type openFretProps = {
    note: string
    octave: number
    visible: boolean
}

export default function OpenFret(props:openFretProps) {
    let noteClasses = [
        "note"
    ];
    if(props.visible) {
        noteClasses.push("show");
    }
    return <div className="open">
        <div className="head"></div>
        <div className={noteClasses.join(" ")}>
            <span>{props.note}</span>
            <div className="note-scale-num"></div>
        </div>
    </div>
}