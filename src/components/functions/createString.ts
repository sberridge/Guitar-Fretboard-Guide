import notes from "../../lib/notes";
import guitarString from "../types/guitarString";
import note from "../types/note";
import getFrets from "./getFrets";

const createString = (stringNum:number, tuning:note[], scaleNotes:string[], showAllNotes:boolean, testing:boolean, foundTestNotes:note[]): guitarString => {
    const string:guitarString = {
        openNote: tuning[stringNum].note,
        openNoteVisible: !testing || foundTestNotes.some((note)=>{return note.note == tuning[stringNum].note && note.octave == tuning[stringNum].octave;}),
        openOctave: tuning[stringNum].octave,
        openScaleNum: null,
        openVisible: testing || scaleNotes.length == 0 && showAllNotes || scaleNotes.includes(tuning[stringNum].note),
        frets: [],
        stringKey: "string-" + stringNum.toString()
    };

    const notePosition = notes.indexOf(string.openNote) + 1;
    const fretOctave = string.openOctave;

    if(scaleNotes.includes(string.openNote)) {
        const openScalePosition = scaleNotes.indexOf(string.openNote);
        string.openScaleNum = openScalePosition == 0 ? "T" : (openScalePosition+1).toString();
    }

    string.frets = getFrets(stringNum.toString(), notePosition, fretOctave, scaleNotes, showAllNotes, testing, foundTestNotes);
    return string;
};

export default createString;