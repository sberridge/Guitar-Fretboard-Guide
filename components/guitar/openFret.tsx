type playNoteFunc = (stringNum:number, fretNum:number)=>void
type openFretProps = {
    note: string
    octave: number
    visible: boolean
    stringNum: number
    onPlayNote: playNoteFunc
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
        <div onClick={()=>{props.onPlayNote(props.stringNum,-1)}} className={noteClasses.join(" ")}>
            <span>{props.note}</span>
            <div className="note-scale-num"></div>
        </div>
    </div>
}