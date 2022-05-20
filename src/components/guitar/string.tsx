import React from "react";
import AudioPlayer from "../../lib/AudioPlayer";
import Fret from "./fret";
import OpenFret from "./openFret";

function renderFret(fret:fret, audioPlayer:AudioPlayer | null) {
    return <Fret
        note={fret.note}
        octave={fret.octave}
        visible={fret.visible}
        audioPlayer={audioPlayer}
        scaleNum={fret.scaleNum}
        fretKey={fret.fretKey}
        key={fret.fretKey}
    ></Fret>;
}
type fret = {
    note: string
    octave: number
    fretKey: string
    visible: boolean
    scaleNum: string | null
}
type guitarString = {
    openNote: string
    openOctave: number
    openVisible: boolean
    stringKey: string
    frets: fret[]
    openScaleNum: string | null
}

type guitarStringProps = {
    guitarString:guitarString
    audioPlayer: AudioPlayer | null
}

const createFrets = (guitarString:guitarString, audioPlayer:AudioPlayer|null) => {
    const frets:JSX.Element[] = [];
    for(let i = 0; i < guitarString.frets.length; i++) {
        frets.push(renderFret(guitarString.frets[i], audioPlayer));
    }
    return frets;
};

export default function GuitarString({guitarString,audioPlayer}:guitarStringProps) {
    
    const frets = createFrets(guitarString, audioPlayer);

    const stringKey = guitarString.stringKey;
    const stringNum = parseInt(stringKey.split('-')[1]);

    return <div className="fretboard__string">
        <OpenFret
            note={guitarString.openNote}
            octave={guitarString.openOctave}
            visible={guitarString.openVisible}
            scaleNum={guitarString.openScaleNum}
            stringNum={stringNum}
            audioPlayer={audioPlayer}
        ></OpenFret>
        {frets}
    </div>;
}