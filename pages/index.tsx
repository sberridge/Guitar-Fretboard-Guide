import type { NextPage } from 'next'
import { ChangeEvent, useState } from 'react'
import Fretboard from '../components/guitar/fretboard'
import FretboardControls from '../components/guitar/fretboardControls'
import Layout from '../components/layout'
import AudioPlayer from '../lib/AudioPlayer'
import { tunings, availableTunings } from '../lib/tunings'
import notes from '../lib/notes'

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

type state = {
  tuning: string,
  scaleNotes: string[],
  scale: string,
  scaleRoot: string,
  guitarStrings: guitarString[]
}

const Home: NextPage = () => {
  let audioPlayer:AudioPlayer | null = null;
  if(typeof window !== "undefined") {
    audioPlayer = new AudioPlayer();
  }
  
  const guitarStrings = createStrings();
  let initialState:state = {
    tuning: "standard",
    scaleNotes: [],
    scale: "",
    scaleRoot: "",
    guitarStrings: guitarStrings
  };
  const [state,setState] = useState(initialState);
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
      guitarStrings: strings,
      scaleNotes: state.scaleNotes,
      scale: state.scale,
      scaleRoot: state.scaleRoot
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
      tuning: state.tuning,
      guitarStrings: strings,
      scaleNotes: state.scaleNotes,
      scale: state.scale,
      scaleRoot: state.scaleRoot
    });
  }

  

  const setScaleNotes = (scaleRoot: string, scale: string)=>{
    if(scale == "" || scaleRoot == "") {
      setState({
        tuning: state.tuning,
        guitarStrings: state.guitarStrings,
        scale: scale,
        scaleRoot: scaleRoot,
        scaleNotes: []
      });
      return;
    }
    let allNotes = [...notes,...notes];
    let scaleNotes = [scaleRoot];
    let scaleInts = scale.split("").map(i=>parseInt(i));
    let startIndex = notes.indexOf(scaleRoot);
    scaleInts.forEach(int=>{
      startIndex += int;
      scaleNotes.push(allNotes[startIndex]);
    });
    let strings = state.guitarStrings.slice();
    strings.forEach(string=>{
      if(scaleNotes.includes(string.openNote)) {
        string.openVisible = true;
      } else {
        string.openVisible = false;
      }
      string.frets.forEach(fret=>{
        if(scaleNotes.includes(fret.note)) {
          fret.visible = true;
        } else {
          fret.visible = false;
        }
      })
    })
    setState({
      tuning: state.tuning,
      guitarStrings: strings,
      scale: scale,
      scaleRoot: scaleRoot,
      scaleNotes: scaleNotes
    });
  }

  const scaleRootHandler = (e:ChangeEvent<HTMLSelectElement>)=>{
    let scaleRoot = e.target.value;
    setState({
      tuning: state.tuning,
      guitarStrings: state.guitarStrings,
      scale: state.scale,
      scaleRoot: scaleRoot,
      scaleNotes: []
    });
    if(scaleRoot !== "" && state.scale !== "") {
      setScaleNotes(scaleRoot, state.scale);
    }
  };
  
  const scaleHandler = (e:ChangeEvent<HTMLSelectElement>)=>{
    let scale = e.target.value;
    setState({
      tuning: state.tuning,
      guitarStrings: state.guitarStrings,
      scale: scale,
      scaleRoot: state.scaleRoot,
      scaleNotes: []
    });
    if(scale !== "" && state.scaleRoot !== "") {
      setScaleNotes(state.scaleRoot, scale);
    }    
  };
  
  return (
    <Layout>
      <FretboardControls
        onTuningChange={tuningHandler}
        onShowNotesChange={showNotesHandler}
        onScaleRootChange={scaleRootHandler}
        onScaleChange={scaleHandler}
      ></FretboardControls>
      <Fretboard
        guitarStrings={state.guitarStrings}
        audioPlayer={audioPlayer}
      ></Fretboard>
    </Layout>
  )
}

export default Home
