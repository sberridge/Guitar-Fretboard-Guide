import React from "react";
import fretProps from "../types/fretProps";
import Note from './note';
export default function Fret({note, octave, visible, noteVisible, scaleNum, onNoteClick}:fretProps) {
    return <div className="fretboard__fret">
        <div className="fretboard__fret-string"></div>
        <Note
            note={note}
            octave={octave}
            noteVisible={noteVisible}
            visible={visible}
            scaleNum={scaleNum}
            onClick={onNoteClick}
        ></Note>
    </div>;
}