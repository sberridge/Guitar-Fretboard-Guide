import AudioPlayer from "../../lib/AudioPlayer";
import Note from "./note";

type openFretProps = {
    note: string
    octave: number
    visible: boolean
    scaleNum: string | null
    stringNum: number
    audioPlayer: AudioPlayer | null
}

export default function OpenFret(props:openFretProps) {

    return <div className="fretboard__head">
        <div className="fretboard__tuning-machine"></div>
        <Note
            note={props.note}
            audioPlayer={props.audioPlayer}
            octave={props.octave}
            visible={props.visible}
            scaleNum={props.scaleNum}
        ></Note>
    </div>
}