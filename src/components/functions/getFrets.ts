import fret from "../types/fret";
import notes from './../../lib/notes';
const getFrets = (stringNum:string, note:number, octave:number, scaleNotes:string[], showAllNotes:boolean):fret[] => {
    const frets:fret[] = [];
    for(let fretNum = 0; fretNum < 13; fretNum++) {
        if(note >= notes.length) {
            note = 0;
        }
        const fretNote = notes[note];
        if(fretNote == "C") {
            octave++;
        }

        let fretScaleNum: null | string = null;
        if(scaleNotes.includes(fretNote)) {
            const fretScalePosition = scaleNotes.indexOf(fretNote);
            fretScaleNum = fretScalePosition == 0 ? "T" : (fretScalePosition+1).toString();
        }

        frets.push({
            note: fretNote,
            octave: octave,
            visible: scaleNotes.length == 0 && showAllNotes || scaleNotes.includes(fretNote),
            scaleNum: fretScaleNum,
            fretKey: "fret-" + stringNum + "-" + fretNum.toString()
        });


        note++;
    }
    return frets;
};

export default getFrets;