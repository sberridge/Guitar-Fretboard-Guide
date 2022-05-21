import React from "react";
import fretProps from "../types/fretProps";
import Note from "./note";


export default function OpenFret({note,octave,visible,noteVisible,scaleNum, onNoteClick}:fretProps) {
    return <div className="fretboard__head">
        <div className="fretboard__tuning-machine"></div>
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