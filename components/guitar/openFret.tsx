
type openFretProps = {
    note: string
    octave: number
}

export default function OpenFret(props:openFretProps) {
    return <div className="open">
        <div className="head"></div>
        <div className="note">
            <span>{props.note}</span>
            <div className="note-scale-num"></div>
        </div>
    </div>
}