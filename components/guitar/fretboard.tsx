import { useState } from "react";
import GuitarString from "./string"
function renderString(stringDetails:guitarString) {
    return <GuitarString
        guitarString={stringDetails}
        key={stringDetails.stringKey}
    ></GuitarString>
}

type fret = {
    note: string
    octave: number
    visible: boolean
    fretKey: string
}
type guitarString = {
    openNote: string
    openOctave: number
    stringKey: string
    frets: fret[]
}

const notes = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B"
];

const tunings = {
    "standard": [
        {
            "note": "E",
            "octave": 4
        },
        {
            "note": "B",
            "octave": 3
        },
        {
            "note": "G",
            "octave": 3
        },
        {
            "note": "D",
            "octave": 3
        },
        {
            "note": "A",
            "octave": 2
        },
        {
            "note": "E",
            "octave": 2
        }
    ]
}

export default function Fretboard() {
    
    let stateStrings:guitarString[] = [];
    for(let stringNum = 0; stringNum < 6; stringNum++) {
        let gs:guitarString = {
            openNote: tunings.standard[stringNum].note,
            openOctave: tunings.standard[stringNum].octave,
            frets: [],
            stringKey: "string-" + stringNum.toString()
        }
        let notePosition = notes.indexOf(gs.openNote) + 1;
        let fretOctave = gs.openOctave;
        for(let fretNum = 0; fretNum < 13; fretNum++) {
            if(notePosition >= notes.length) {
                notePosition = 0;
            }
            const fretNote = notes[notePosition];
            if(fretNote == "C") {
                fretOctave++;
            }

            gs.frets.push({
                note: fretNote,
                octave: fretOctave,
                visible: false,
                fretKey: "fret-" + stringNum.toString() + "-" + fretNum.toString()
            });

            notePosition++;
        }
        stateStrings.push(gs);
    }
    let [state, setState] = useState({
        "guitarStrings": stateStrings
    });
    let renderedStrings:JSX.Element[] = [];
    for(let i = 0; i < 6; i++) {

        renderedStrings.push(renderString(state.guitarStrings[i]));
    }

    return <div id="fretboard">
        {renderedStrings}
    </div>
}