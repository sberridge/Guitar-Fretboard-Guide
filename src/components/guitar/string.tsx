import React from "react";
import AudioPlayer from "../../lib/AudioPlayer";
import Fret from "./fret";
import OpenFret from "./openFret";
import guitarString from "../types/guitarString";
import fret from "../types/fret";
import note from "../types/note";
import onNoteClick from "../types/onNoteClick";

function renderFret(fret:fret, audioPlayer:AudioPlayer | null, onNoteClick:onNoteClick) {
    return <Fret
        note={fret.note}
        octave={fret.octave}
        visible={fret.visible}
        noteVisible={fret.noteVisible}
        audioPlayer={audioPlayer}
        scaleNum={fret.scaleNum}
        key={fret.fretKey}
        onNoteClick={onNoteClick}
    ></Fret>;
}


type guitarStringProps = {
    guitarString:guitarString
    audioPlayer: AudioPlayer | null
    onNoteClick:(note:note)=>void
}

const createFrets = (guitarString:guitarString, audioPlayer:AudioPlayer|null, onNoteClick:onNoteClick) => {
    const frets:JSX.Element[] = [];
    for(let i = 0; i < guitarString.frets.length; i++) {
        frets.push(renderFret(guitarString.frets[i], audioPlayer, onNoteClick));
    }
    return frets;
};

export default function GuitarString({guitarString,audioPlayer,onNoteClick}:guitarStringProps) {
    
    const frets = createFrets(guitarString, audioPlayer, onNoteClick);

    return <div className="fretboard__string">
        <OpenFret
            note={guitarString.openNote}
            octave={guitarString.openOctave}
            noteVisible={guitarString.openNoteVisible}
            visible={guitarString.openVisible}
            scaleNum={guitarString.openScaleNum}
            audioPlayer={audioPlayer}
            onNoteClick={onNoteClick}
        ></OpenFret>
        {frets}
    </div>;
}