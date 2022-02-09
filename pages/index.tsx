import type { NextPage } from 'next'
import { ChangeEvent, useState } from 'react'
import Fretboard from '../components/guitar/fretboard'
import FretboardControls from '../components/guitar/fretboardControls'
import Layout from '../components/layout'


type fret = {
  note: string
  octave: number
  visible: boolean
  fretKey: string
}
type guitarString = {
  openNote: string
  openOctave: number
  openVisible: boolean
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
  ],
  "dropd": [
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
          "note": "D",
          "octave": 2
      }
  ]
}

type availableTunings = "standard" | "dropd";

const createStrings = () => {
  let stateStrings:guitarString[] = [];
  for(let stringNum = 0; stringNum < 6; stringNum++) {
      let gs:guitarString = {
          openNote: tunings.standard[stringNum].note,
          openOctave: tunings.standard[stringNum].octave,
          openVisible: false,
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
  return stateStrings;
}

const tuneStrings = (tuning:availableTunings, strings:guitarString[]) => {
  let stateStrings:guitarString[] = [];
  strings.forEach((string,stringNum)=>{
    const stringTune = tunings[tuning][stringNum];
    string.openNote = stringTune.note;
    string.openOctave = stringTune.octave;

    let notePosition = notes.indexOf(string.openNote) + 1;
    let fretOctave = string.openOctave;

    string.frets.forEach((fret,fretNum)=>{
      if(notePosition >= notes.length) {
        notePosition = 0;
      }

      const fretNote = notes[notePosition];
      if(fretNote == "C") {
        fretOctave++;
      }

      fret.note = fretNote;
      fret.octave = fretOctave;

      notePosition++;
    });

  })
  for(let stringNum = 0; stringNum < 6; stringNum++) {
      let gs:guitarString = {
          openNote: tunings[tuning][stringNum].note,
          openOctave: tunings[tuning][stringNum].octave,
          openVisible: false,
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
  return stateStrings;
}

const Home: NextPage = () => {

  const guitarStrings = createStrings();

  const [state,setState] = useState({
    tuning: "standard",
    guitarStrings: guitarStrings
  });
  const tuningHandler = (e:ChangeEvent<HTMLSelectElement>)=>{
    let strings = state.guitarStrings.slice();
    const tuning = e.target.value;    
    switch(tuning) {
      case "standard":
      case "dropd":
        tuneStrings(tuning, strings);
        break;
    }
    setState({
      tuning: tuning,
      guitarStrings: strings
    });
  }
  const showNotesHandler = (e:ChangeEvent<HTMLInputElement>)=>{
    let strings = state.guitarStrings.slice();
    if(e.target.checked) {
      strings.forEach(string=>{
        string.openVisible = true;
        string.frets.forEach(fret=>{
          fret.visible = true;
        });
      });
    } else {
      strings.forEach(string=>{
        string.openVisible = false;
        string.frets.forEach(fret=>{
          fret.visible = false;
        });
      });
    }
    setState({
      guitarStrings: strings,
      tuning: state.tuning
    });
  }
  return (
    <Layout>
      <FretboardControls
        onTuningChange={tuningHandler}
        onShowNotesChange={showNotesHandler}
      ></FretboardControls>
      <Fretboard
        guitarStrings={state.guitarStrings}
      ></Fretboard>
    </Layout>
  )
}

export default Home
