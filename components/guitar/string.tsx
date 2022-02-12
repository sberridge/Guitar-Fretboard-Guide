import AudioPlayer from "../../lib/AudioPlayer";
import Fret from "./fret";
import OpenFret from "./openFret";

function renderFret(fret:fret, audioPlayer:AudioPlayer | null) {
    return <Fret
        note={fret.note}
        octave={fret.octave}
        visible={fret.visible}
        audioPlayer={audioPlayer}
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
    audioPlayer: AudioPlayer | null
}

export default function GuitarString(props:guitarStringProps) {
    let frets:JSX.Element[] = [];
    for(let i = 0; i < 13; i++) {
        frets.push(renderFret(props.guitarString.frets[i], props.audioPlayer));
    }
    const stringKey = props.guitarString.stringKey;
    const stringNum = parseInt(stringKey.split('-')[1]);

    return <div className="string">
        <OpenFret
            note={props.guitarString.openNote}
            octave={props.guitarString.openOctave}
            visible={props.guitarString.openVisible}
            stringNum={stringNum}
            audioPlayer={props.audioPlayer}
        ></OpenFret>
        {frets}
    </div>
}