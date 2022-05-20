import React from "react";
import AudioPlayer from '../../lib/AudioPlayer';
import Note from './note';

type fretProps = {
    note: string
    visible: boolean
    octave: number
    fretKey: string
    scaleNum: string | null
    audioPlayer: AudioPlayer | null
}
export default function Fret({note, octave, audioPlayer, visible, scaleNum}:fretProps) {
    return <div className="fretboard__fret">
        <div className="fretboard__fret-string"></div>
        <Note
            note={note}
            octave={octave}
            audioPlayer={audioPlayer}
            visible={visible}
            scaleNum={scaleNum}
        ></Note>
    </div>;
}