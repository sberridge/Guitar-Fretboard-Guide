import React from "react";
import Fret from "./fret";
import OpenFret from "./openFret";
import guitarString from "../types/guitarString";
import fret from "../types/fret";
import note from "../types/note";
import onNoteClick from "../types/onNoteClick";

function renderFret(fret:fret, onNoteClick:onNoteClick) {
    return <Fret
        note={fret.note}
        octave={fret.octave}
        visible={fret.visible}
        noteVisible={fret.noteVisible}
        scaleNum={fret.scaleNum}
        key={fret.fretKey}
        onNoteClick={onNoteClick}
    ></Fret>;
}


type guitarStringProps = {
    guitarString:guitarString
    onNoteClick:(note:note)=>void
}

const createFrets = (guitarString:guitarString, onNoteClick:onNoteClick) => {
    const frets:JSX.Element[] = [];
    for(let i = 0; i < guitarString.frets.length; i++) {
        frets.push(renderFret(guitarString.frets[i], onNoteClick));
    }
    return frets;
};

export default function GuitarString({guitarString,onNoteClick}:guitarStringProps) {
    
    const frets = createFrets(guitarString, onNoteClick);

    return <div className="fretboard__string">
        <OpenFret
            note={guitarString.openNote}
            octave={guitarString.openOctave}
            noteVisible={guitarString.openNoteVisible}
            visible={guitarString.openVisible}
            scaleNum={guitarString.openScaleNum}
            onNoteClick={onNoteClick}
        ></OpenFret>
        {frets}
    </div>;
}