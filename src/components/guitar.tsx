import React, { ChangeEvent, useContext, useState } from 'react';
import Fretboard from './guitar/fretboard';
import FretboardControls from './guitar/fretboardControls';
import { tunings, availableTunings } from '../lib/tunings';
import notes from '../lib/notes';
import ScaleDisplay from './guitar/scaleDisplay';
import note from './types/note';
import guitarString from './types/guitarString';
import getScaleFrequencies from './functions/getScaleFrequencies';
import getStartingScaleOctave from './functions/getStartingScaleOctave';
import getFrets from './functions/getFrets';
import getScaleNotes from './functions/getScaleNotes';
import audioPlayerContext from './../contexts/audioPlayerContext';



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


const createStrings = (tuning:availableTunings, showAllNotes:boolean, scaleNotes:string[], testing:boolean, foundTestNotes:note[]): guitarString[] => {
  const stateStrings:guitarString[] = [];
  const selectedTuning = tunings.get(tuning);
  if(!selectedTuning) return stateStrings;
  for(let stringNum = 0; stringNum < 6; stringNum++) {
    stateStrings.push(createString(stringNum, selectedTuning, scaleNotes, showAllNotes, testing, foundTestNotes));
  }
  return stateStrings;
};


const Guitar = () => {
  
  const audioPlayer = useContext(audioPlayerContext);

  const [testing, setTesting] = useState(false);
  const [foundTestNotes, setFoundTestNotes] = useState<note[]>([]);
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
      setTuning(newTuning);
    }
    
  };
  const showNotesHandler = (e:ChangeEvent<HTMLInputElement>)=>{
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
      return;
    }
    
    const newScaleNotes = getScaleNotes(newScaleRoot, newScale);

    const octave:number = getStartingScaleOctave(newGuitarStrings[5], newScaleNotes[0]);
    
    const newScaleFrequencies:number[] = getScaleFrequencies(newScaleNotes, octave);
    playScale([...newScaleFrequencies]);
    setScaleFrequencies(newScaleFrequencies);
    setScale(newScale);
    setScaleRoot(newScaleRoot);
    setScaleNotes(newScaleNotes);
    setFoundTestNotes([]);
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

  const toggleTesting = ()=>{
    if(testing) {
      setFoundTestNotes([]);
    }
    setTesting(!testing);
  };

  const noteClickHandler = (note:note)=>{
    if(!testing) return;
    const octaveScaleNotes = [...scaleNotes].slice(0, scaleNotes.length-1);
    let nextNoteIndex:number = foundTestNotes.length == 0 ? 0 : foundTestNotes.length;
    let expectedOctave:number | undefined;
    if(nextNoteIndex >= octaveScaleNotes.length) {
      nextNoteIndex = nextNoteIndex - octaveScaleNotes.length;
      if(octaveScaleNotes.length > 0) {
        expectedOctave = foundTestNotes[0].octave + 1;
      }
    }
    const expectedNote = octaveScaleNotes[nextNoteIndex];
    if(note.note == expectedNote) {
      if(expectedOctave && note.octave !== expectedOctave) return;
      setFoundTestNotes([...foundTestNotes, {...note}]);
    }
    console.log(note, nextNoteIndex, expectedNote);
  };

  const newGuitarStrings = createStrings(tuning, showAllNotes, scaleNotes, testing, foundTestNotes);

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
          scaleFrequencies={scaleFrequencies}
          testing={testing}
          onPlayScale={playScaleHandler}
          toggleTesting={toggleTesting}
        ></ScaleDisplay>
      }
      <div className='guitar'>
        <Fretboard
          onNoteClick={noteClickHandler}
        >{newGuitarStrings}</Fretboard>
      </div>
    </div>
  );

};

export default Guitar;