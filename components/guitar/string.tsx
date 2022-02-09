import Fret from "./fret";
import OpenFret from "./openFret";

function renderFret(fret:fret) {
    return <Fret
        note={fret.note}
        octave={fret.octave}
        visible={fret.visible}
        key={fret.fretKey}
    ></Fret>
}

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
    frets: fret[]
}

type guitarStringProps = {
    guitarString:guitarString
}

export default function GuitarString(props:guitarStringProps) {
    let frets:JSX.Element[] = [];
    for(let i = 0; i < 13; i++) {
        frets.push(renderFret(props.guitarString.frets[i]));
    }
    return <div className="string">
        <OpenFret
            note={props.guitarString.openNote}
            octave={props.guitarString.openOctave}
            visible={props.guitarString.openVisible}
        ></OpenFret>
        {frets}
    </div>
}