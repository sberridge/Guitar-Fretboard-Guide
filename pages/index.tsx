import type { NextPage } from 'next'
import { ChangeEvent, useState } from 'react'
import Fretboard from '../components/guitar/fretboard'
import FretboardControls from '../components/guitar/fretboardControls'
import Layout from '../components/layout'
import AudioPlayer from '../lib/AudioPlayer'
import { tunings, availableTunings } from '../lib/tunings'
import notes from '../lib/notes'
import * as f from '../lib/frequencies.json'
type frequencyList = {
  [key:string]:number[]
}
const frequencies:frequencyList = f;

type fret = {
  note: string
  octave: number
  visible: boolean
  fretKey: string
  scaleNum: string | null
}
type guitarString = {
  openNote: string
  openOctave: number
  openVisible: boolean
  openScaleNum: string | null
  stringKey: string
  frets: fret[]
}




const createStrings = (state:state): guitarString[] => {
  let stateStrings:guitarString[] = [];
  const standardTuning = tunings.get(state.tuning);
  if(!standardTuning) return stateStrings;
  for(let stringNum = 0; stringNum < 6; stringNum++) {
      let gs:guitarString = {
          openNote: standardTuning[stringNum].note,
          openOctave: standardTuning[stringNum].octave,
          openScaleNum: null,
          openVisible: state.scaleNotes.length == 0 && state.showAllNotes || state.scaleNotes.includes(standardTuning[stringNum].note),
          frets: [],
          stringKey: "string-" + stringNum.toString()
      }
      let notePosition = notes.indexOf(gs.openNote) + 1;
      let fretOctave = gs.openOctave;
      if(state.scaleNotes.includes(gs.openNote)) {
        let openScalePosition = state.scaleNotes.indexOf(gs.openNote);
        gs.openScaleNum = openScalePosition == 0 ? "T" : (openScalePosition+1).toString();
      }
      for(let fretNum = 0; fretNum < 13; fretNum++) {
          if(notePosition >= notes.length) {
              notePosition = 0;
          }
          const fretNote = notes[notePosition];
          if(fretNote == "C") {
              fretOctave++;
          }

          let fretScaleNum: null | string = null;
          if(state.scaleNotes.includes(fretNote)) {
            let fretScalePosition = state.scaleNotes.indexOf(fretNote);
            fretScaleNum = fretScalePosition == 0 ? "T" : (fretScalePosition+1).toString();
          }

          gs.frets.push({
              note: fretNote,
              octave: fretOctave,
              visible: state.scaleNotes.length == 0 && state.showAllNotes || state.scaleNotes.includes(fretNote),
              scaleNum: fretScaleNum,
              fretKey: "fret-" + stringNum.toString() + "-" + fretNum.toString()
          });

          notePosition++;
      }
      stateStrings.push(gs);
  }
  return stateStrings;
}

type state = {
  tuning: availableTunings,
  scaleNotes: string[],
  scale: string,
  scaleRoot: string,
  guitarStrings: guitarString[]
  showAllNotes: boolean
}

const Home: NextPage = () => {
  let audioPlayer:AudioPlayer | null = null;
  if(typeof window !== "undefined") {
    audioPlayer = new AudioPlayer();
  }
  let initialState:state = {
    tuning: "standard",
    scaleNotes: [],
    scale: "",
    scaleRoot: "",
    guitarStrings: [],
    showAllNotes: false
  };
  const guitarStrings = createStrings(initialState);
  initialState.guitarStrings = guitarStrings
  const [state,setState] = useState(initialState);

  const tuningHandler = (e:ChangeEvent<HTMLSelectElement>)=>{
    let tuning:availableTunings | undefined = undefined;
    switch(e.target.value) {
      case "standard":
      case "dropd":
      case "ddropd":
      case "dadgad":
      case "opend":
        tuning = e.target.value;
        break;
    }
    if(typeof tuning !== "undefined") {
      let newState:state = {
        tuning: tuning,
        guitarStrings: [],
        scaleNotes: state.scaleNotes,
        scale: state.scale,
        scaleRoot: state.scaleRoot,
        showAllNotes: state.showAllNotes
      };

      newState.guitarStrings = createStrings(newState)

      setState(newState);
    }
    
  }
  const showNotesHandler = (e:ChangeEvent<HTMLInputElement>)=>{
    let newState: state = {
      tuning: state.tuning,
      guitarStrings: [],
      scaleNotes: state.scaleNotes,
      scale: state.scale,
      scaleRoot: state.scaleRoot,
      showAllNotes: e.target.checked
    };
    newState.guitarStrings = createStrings(newState);

    setState(newState);
  }

  const playScale = (scale:number[]) => {
    let note = scale.shift();
    if(note) {
      audioPlayer?.play(note);
    }
    if(scale.length > 0) {
      setTimeout(()=>{
        playScale(scale);
      },500);
    }
    

  }

  const setScaleNotes = (scaleRoot: string, scale: string)=>{
    if(scale == "" || scaleRoot == "") {
      let newState: state = {
        tuning: state.tuning,
        guitarStrings: [],
        scale: scale,
        scaleRoot: scaleRoot,
        scaleNotes: [],
        showAllNotes: state.showAllNotes
      };
      newState.guitarStrings = createStrings(newState);
      setState(newState);
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

    let newState:state = {
      tuning: state.tuning,
      guitarStrings: [],
      scale: scale,
      scaleRoot: scaleRoot,
      scaleNotes: scaleNotes,
      showAllNotes: state.showAllNotes
    };

    newState.guitarStrings = createStrings(newState);

    let string = newState.guitarStrings[5];
    let octave:number = 0;
    if(string.openNote == scaleNotes[0]) {
      octave = string.openOctave;
    } else {
      string.frets.forEach(fret=>{
        if(fret.note == scaleNotes[0]) {
          octave = fret.octave;
          return;
        }
      })
    }
    if(scaleNotes[0] in frequencies) {
      scaleNotes = [...scaleNotes.slice(0,scaleNotes.length-1),...scaleNotes];
      let previousPosition = notes.indexOf(scaleNotes[0]);
      let scaleFrequencies = scaleNotes.map((note,i)=>{
        let thisPosition = notes.indexOf(note);
        if((scaleNotes[0] == "C" && i > 0 && note == "C") || previousPosition > thisPosition) {
          octave++;
        }
        previousPosition = thisPosition;
        return frequencies[note][octave];
      })
      playScale(scaleFrequencies);
    }

    setState(newState);
  }

  const scaleRootHandler = (e:ChangeEvent<HTMLSelectElement>)=>{
    let scaleRoot = e.target.value;
    setState({
      tuning: state.tuning,
      guitarStrings: state.guitarStrings,
      scale: state.scale,
      scaleRoot: scaleRoot,
      scaleNotes: [],
      showAllNotes: state.showAllNotes
    });
    if((scaleRoot !== "" || state.scaleRoot !== "") && state.scale !== "") {
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
      scaleNotes: [],
      showAllNotes: state.showAllNotes
    });
    if((scale !== "" || state.scale !== "") && state.scaleRoot !== "") {
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
