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
    ></Fret>
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

export default function GuitarString(props:guitarStringProps) {
    let frets:JSX.Element[] = [];
    for(let i = 0; i < props.guitarString.frets.length; i++) {
        frets.push(renderFret(props.guitarString.frets[i], props.audioPlayer));
    }
    const stringKey = props.guitarString.stringKey;
    const stringNum = parseInt(stringKey.split('-')[1]);

    return <div className="fretboard__string">
        <OpenFret
            note={props.guitarString.openNote}
            octave={props.guitarString.openOctave}
            visible={props.guitarString.openVisible}
            scaleNum={props.guitarString.openScaleNum}
            stringNum={stringNum}
            audioPlayer={props.audioPlayer}
        ></OpenFret>
        {frets}
    </div>
}