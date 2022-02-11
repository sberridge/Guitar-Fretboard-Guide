import type { NextPage } from 'next'
import { ChangeEvent, useState } from 'react'
import Fretboard from '../components/guitar/fretboard'
import FretboardControls from '../components/guitar/fretboardControls'
import Layout from '../components/layout'
import AudioPlayer from '../lib/AudioPlayer'
import frequencies from '../lib/frequencies'
import { tunings, availableTunings } from '../lib/tunings'

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


const createStrings = (): guitarString[] => {
  let stateStrings:guitarString[] = [];
  const standardTuning = tunings.get("standard");
  if(!standardTuning) return stateStrings;
  for(let stringNum = 0; stringNum < 6; stringNum++) {
      let gs:guitarString = {
          openNote: standardTuning[stringNum].note,
          openOctave: standardTuning[stringNum].octave,
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
  const tuningNotes = tunings.get(tuning);
  if(!tuningNotes) return;
  strings.forEach((string,stringNum)=>{
    const stringTune = tuningNotes[stringNum];
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
  
}

const Home: NextPage = () => {
  let audioPlayer:AudioPlayer;
  if(typeof window !== "undefined") {
    audioPlayer = new AudioPlayer();
  }
  
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
      case "ddropd":
      case "dadgad":
      case "opend":
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
  const playNote = (stringNum:number, fretNum:number) =>{
    const string = state.guitarStrings[stringNum];
    let note: string;
    let octave: number;
    if(fretNum == -1) {
      note = string.openNote;
      octave = string.openOctave;
    } else {
      note = string.frets[fretNum].note;
      octave = string.frets[fretNum].octave;
    }
    const noteFrequencies = frequencies.get(note);
    if(noteFrequencies) {
      audioPlayer.play(noteFrequencies[octave]);
    }
  }
  
  return (
    <Layout>
      <FretboardControls
        onTuningChange={tuningHandler}
        onShowNotesChange={showNotesHandler}
      ></FretboardControls>
      <Fretboard
        guitarStrings={state.guitarStrings}
        onPlayNote={(stringNum:number,fretNum:number)=>playNote(stringNum,fretNum)}
      ></Fretboard>
    </Layout>
  )
}

export default Home
