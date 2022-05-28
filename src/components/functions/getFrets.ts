import fret from "../types/fret";
import note from "../types/note";
import notes from './../../lib/notes';

const getScaleLabel = (scaleNotes:string[], note:string) => {
    let fretScaleNum: null | string = null;
    if(scaleNotes.includes(note)) {
        const fretScalePosition = scaleNotes.indexOf(note);
        fretScaleNum = fretScalePosition == 0 ? "T" : (fretScalePosition+1).toString();
    }
    return fretScaleNum;
};

const getFrets = (stringNum:string, note:number, octave:number, scaleNotes:string[], showAllNotes:boolean, inScaleGame:boolean, foundScaleGameNotes:note[]):fret[] => {
    const frets:fret[] = [];
    for(let fretNum = 0; fretNum < 13; fretNum++) {
        if(note >= notes.length) {
            note = 0;
        }
        const fretNote = notes[note];
        if(fretNote == "C") {
            octave++;
        }

        const fretScaleNum = getScaleLabel(scaleNotes, fretNote);

        frets.push({
            note: fretNote,
            octave: octave,
            noteVisible: !inScaleGame || foundScaleGameNotes.some((note)=>{return note.note === fretNote && note.octave === octave;}),
            visible: inScaleGame || scaleNotes.length == 0 && showAllNotes || scaleNotes.includes(fretNote),
            scaleNum: fretScaleNum,
            fretKey: "fret-" + stringNum + "-" + fretNum.toString()
        });


        note++;
    }
    return frets;
};

export default getFrets;