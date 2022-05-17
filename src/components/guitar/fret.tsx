import React from "react";
import AudioPlayer from '../../lib/AudioPlayer'
import Note from './note';

type fretProps = {
    note: string
    visible: boolean
    octave: number
    fretKey: string
    scaleNum: string | null
    audioPlayer: AudioPlayer | null
}
export default function Fret(props:fretProps) {
    return <div className="fretboard__fret">
        <div className="fretboard__fret-string"></div>
        <Note
            note={props.note}
            octave={props.octave}
            audioPlayer={props.audioPlayer}
            visible={props.visible}
            scaleNum={props.scaleNum}
        ></Note>
    </div>
}