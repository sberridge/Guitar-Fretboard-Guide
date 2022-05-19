import React from "react";
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

export default function OpenFret({note,audioPlayer,octave,visible,scaleNum}:openFretProps) {

    return <div className="fretboard__head">
        <div className="fretboard__tuning-machine"></div>
        <Note
            note={note}
            audioPlayer={audioPlayer}
            octave={octave}
            visible={visible}
            scaleNum={scaleNum}
        ></Note>
    </div>
}