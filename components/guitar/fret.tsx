type fretProps = {
    note: string
    visible: boolean
    octave: number
    fretKey: string
    onPlayNote: playNoteFunc
}
type playNoteFunc = (stringNum:number, fretNum:number)=>void
export default function Fret(props:fretProps) {
    let noteClasses = [
        "note"
    ];
    if(props.visible) {
        noteClasses.push("show");
    }
    const fretKeys = props.fretKey.split("-");
    return <div className="fret">
        <div className="fret-string"></div>
        <div onClick={()=>{props.onPlayNote(parseInt(fretKeys[1]),parseInt(fretKeys[2]))}} className={noteClasses.join(" ")}>
            <span>{props.note}</span>
            <div className="note-scale-num"></div>
        </div>
    </div>
}