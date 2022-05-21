import React from "react";
import fretProps from "../types/fretProps";
import Note from "./note";


export default function OpenFret({note,audioPlayer,octave,visible,noteVisible,scaleNum, onNoteClick}:fretProps) {
    return <div className="fretboard__head">
        <div className="fretboard__tuning-machine"></div>
        <Note
            note={note}
            audioPlayer={audioPlayer}
            octave={octave}
            noteVisible={noteVisible}
            visible={visible}
            scaleNum={scaleNum}
            onClick={onNoteClick}
        ></Note>
    </div>;
}