import Fret from "./fret";
import OpenFret from "./openFret";

function renderFret(fret:fret, noteFunc:playNoteFunc) {
    return <Fret
        note={fret.note}
        octave={fret.octave}
        visible={fret.visible}
        onPlayNote={noteFunc}
        fretKey={fret.fretKey}
        key={fret.fretKey}
    ></Fret>
}
type playNoteFunc = (stringNum:number, fretNum:number)=>void
type fret = {
    note: string
    octave: number
    fretKey: string
    visible: boolean
}
type guitarString = {
    openNote: string
    openOctave: number
    openVisible: boolean
    stringKey: string
    frets: fret[]
}

type guitarStringProps = {
    guitarString:guitarString
    onPlayNote: playNoteFunc
}

export default function GuitarString(props:guitarStringProps) {
    let frets:JSX.Element[] = [];
    for(let i = 0; i < 13; i++) {
        frets.push(renderFret(props.guitarString.frets[i], props.onPlayNote));
    }
    const stringKey = props.guitarString.stringKey;
    const stringNum = parseInt(stringKey.split('-')[1]);

    return <div className="string">
        <OpenFret
            note={props.guitarString.openNote}
            octave={props.guitarString.openOctave}
            visible={props.guitarString.openVisible}
            stringNum={stringNum}
            onPlayNote={props.onPlayNote}
        ></OpenFret>
        {frets}
    </div>
}