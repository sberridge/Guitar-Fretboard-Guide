import type { NextPage } from 'next'
import { ChangeEvent, useState } from 'react'
import Fretboard from '../components/guitar/fretboard'
import FretboardControls from '../components/guitar/fretboardControls'
import TuningSelect from '../components/guitar/tuningSelect'
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

const tuneStrings = (tuning:availableTunings) => {
  let stateStrings:guitarString[] = [];
  for(let stringNum = 0; stringNum < 6; stringNum++) {
      let gs:guitarString = {
          openNote: tunings[tuning][stringNum].note,
          openOctave: tunings[tuning][stringNum].octave,
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

  const guitarStrings = tuneStrings("standard");

  const [state,setState] = useState({
    guitarStrings: guitarStrings
  });
  const tuningHandler = (e:ChangeEvent<HTMLSelectElement>)=>{
    let newStrings:guitarString[] = [];
    switch(e.target.value) {
      case "standard":
      case "dropd":
        newStrings = tuneStrings(e.target.value);
        break;
    }
    setState({
      guitarStrings: newStrings
    });
  }
  return (
    <Layout>
      <FretboardControls
        onTuningChange={tuningHandler}
      ></FretboardControls>
      <Fretboard
        guitarStrings={state.guitarStrings}
      ></Fretboard>
    </Layout>
  )
}

export default Home
