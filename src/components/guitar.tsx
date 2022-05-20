import React, { ChangeEvent, useState } from 'react';
import Fretboard from './guitar/fretboard';
import FretboardControls from './guitar/fretboardControls';
import AudioPlayer from '../lib/AudioPlayer';
import { tunings, availableTunings } from '../lib/tunings';
import notes from '../lib/notes';
import ScaleDisplay from './guitar/scaleDisplay';
import note from './types/note';
import guitarString from './types/guitarString';
import getScaleFrequencies from './functions/getScaleFrequencies';
import getStartingScaleOctave from './functions/getStartingScaleOctave';
import getFrets from './functions/getFrets';
import getScaleNotes from './functions/getScaleNotes';



const createString = (stringNum:number, tuning:note[], scaleNotes:string[], showAllNotes:boolean): guitarString => {
  const string:guitarString = {
    openNote: tuning[stringNum].note,
    openOctave: tuning[stringNum].octave,
    openScaleNum: null,
    openVisible: scaleNotes.length == 0 && showAllNotes || scaleNotes.includes(tuning[stringNum].note),
    frets: [],
    stringKey: "string-" + stringNum.toString()
  };

  const notePosition = notes.indexOf(string.openNote) + 1;
  const fretOctave = string.openOctave;

  if(scaleNotes.includes(string.openNote)) {
    const openScalePosition = scaleNotes.indexOf(string.openNote);
    string.openScaleNum = openScalePosition == 0 ? "T" : (openScalePosition+1).toString();
  }

  string.frets = getFrets(stringNum.toString(), notePosition, fretOctave, scaleNotes, showAllNotes);
  return string;
};


const createStrings = (tuning:availableTunings, showAllNotes:boolean, scaleNotes:string[]): guitarString[] => {
  const stateStrings:guitarString[] = [];
  const selectedTuning = tunings.get(tuning);
  if(!selectedTuning) return stateStrings;
  for(let stringNum = 0; stringNum < 6; stringNum++) {
    stateStrings.push(createString(stringNum, selectedTuning, scaleNotes, showAllNotes));
  }
  return stateStrings;
};

type guitarProps = {
  audioPlayer:AudioPlayer | null
}

const Guitar = ({audioPlayer}:guitarProps) => {
  

  const [guitarStrings, setGuitarStrings] = useState(createStrings("standard", false, []));
  const [tuning, setTuning] = useState<availableTunings>("standard");
  const [scaleNotes, setScaleNotes] = useState<string[]>([]);
  const [scaleFrequencies, setScaleFrequencies] = useState<number[]>([]);
  const [scale, setScale] = useState("");
  const [scaleRoot, setScaleRoot] = useState("");
  const [showAllNotes, setShowAllNotes] = useState(false);

  const tuningHandler = (e:ChangeEvent<HTMLSelectElement>)=>{
    let newTuning:availableTunings | undefined = undefined;
    switch(e.target.value) {
      case "standard":
      case "dropd":
      case "ddropd":
      case "dadgad":
      case "opend":
        newTuning = e.target.value;
        break;
    }
    if(typeof newTuning !== "undefined") {
      const newGuitarStrings = createStrings(newTuning, showAllNotes, scaleNotes);
      setTuning(newTuning);
      setGuitarStrings(newGuitarStrings);
    }
    
  };
  const showNotesHandler = (e:ChangeEvent<HTMLInputElement>)=>{
    const newGuitarStrings = createStrings(tuning, e.target.checked,scaleNotes);
    setGuitarStrings(newGuitarStrings);
    setShowAllNotes(e.target.checked);
  };

  const playScale = (scale:number[]) => {
    const note = scale.shift();
    if(note) {
      audioPlayer?.play(note);
    }
    if(scale.length > 0) {
      setTimeout(()=>{
        playScale(scale);
      },500);
    }
    

  };



  const setNewScaleNotes = (newScaleRoot: string, newScale: string)=>{
    if(newScale == "" || newScaleRoot == "") {
      setScaleNotes([]);
      setScaleRoot(newScaleRoot);
      setScale(newScale);
      const newGuitarStrings = createStrings(tuning, showAllNotes, []);
      setGuitarStrings(newGuitarStrings);
      return;
    }
    
    const newScaleNotes = getScaleNotes(newScaleRoot, newScale);

    const newGuitarStrings = createStrings(tuning, showAllNotes, newScaleNotes);

    const octave:number = getStartingScaleOctave(newGuitarStrings[5], newScaleNotes[0]);
    
    const newScaleFrequencies:number[] = getScaleFrequencies(newScaleNotes, octave);
    playScale([...newScaleFrequencies]);
    setScaleFrequencies(newScaleFrequencies);
    setGuitarStrings(newGuitarStrings);
    setScale(newScale);
    setScaleRoot(newScaleRoot);
    setScaleNotes(newScaleNotes);
  };

  const scaleRootHandler = (e:ChangeEvent<HTMLSelectElement>)=>{
    const newScaleRoot = e.target.value;
    setScaleRoot(newScaleRoot);
    setScaleNotes(scaleNotes);
    if((newScaleRoot !== "" || scaleRoot !== "") && scale !== "") {
      setNewScaleNotes(newScaleRoot, scale);
    }
  };
  
  const scaleHandler = (e:ChangeEvent<HTMLSelectElement>)=>{
    const newScale = e.target.value;
    setScale(newScale);
    setScaleNotes([]);
    if((newScale !== "" || scale !== "") && scaleRoot !== "") {
      setNewScaleNotes(scaleRoot, newScale);
    }    
  };

  const playScaleHandler = ()=>{
    if(!scaleFrequencies) {
      return false;
    }
    playScale([...scaleFrequencies]);
  };

  return (
    <div>
      <FretboardControls
        onTuningChange={tuningHandler}
        onShowNotesChange={showNotesHandler}
        onScaleRootChange={scaleRootHandler}
        onScaleChange={scaleHandler}
      ></FretboardControls>
      {scaleNotes && scaleNotes.length > 0 && 
        <ScaleDisplay
          scaleNotes={scaleNotes.slice(0,8)}
          audioPlayer={audioPlayer}
          scaleFrequencies={scaleFrequencies}
          onPlayScale={playScaleHandler}
        ></ScaleDisplay>
      }
      <div className='guitar'>
        <Fretboard
          guitarStrings={guitarStrings}
          audioPlayer={audioPlayer}
        ></Fretboard>
      </div>
    </div>
  );

};

export default Guitar;