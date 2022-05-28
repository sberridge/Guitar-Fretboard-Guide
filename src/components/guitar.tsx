import React, { ChangeEvent, useContext, useState } from 'react';
import Fretboard from './guitar/fretboard';
import FretboardControls from './guitar/fretboardControls';
import { Tunings } from '../lib/tunings';
import ScaleDisplay from './guitar/scaleDisplay';
import note from './types/note';
import getScaleFrequencies from './functions/getScaleFrequencies';
import playScale from './functions/playScale';
import getStartingScaleOctave from './functions/getStartingScaleOctave';
import createStrings from './functions/createStrings';
import getScaleNotes from './functions/getScaleNotes';
import audioPlayerContext from './../contexts/audioPlayerContext';
import getExpectedNote from './functions/scaleGame/getExpectedNote';
import getExpectedOctave from './functions/scaleGame/getExpectedOctave';




const Guitar = () => {
  
  const audioPlayer = useContext(audioPlayerContext);

  const [inScaleGame, setInScaleGame] = useState(false);
  const [foundScaleGameNotes, setFoundScaleGameNotes] = useState<note[]>([]);
  const [tuning, setTuning] = useState<Tunings>(Tunings.standard);
  const [scaleNotes, setScaleNotes] = useState<string[]>([]);
  const [scaleFrequencies, setScaleFrequencies] = useState<number[]>([]);
  const [scale, setScale] = useState("");
  const [scaleRoot, setScaleRoot] = useState("");
  const [showAllNotes, setShowAllNotes] = useState(false);
  

  const tuningHandler = (e:ChangeEvent<HTMLSelectElement>)=>{
    const newTuning:Tunings = e.target.value as Tunings;
    setTuning(newTuning);    
  };
  const showNotesHandler = (e:ChangeEvent<HTMLInputElement>)=>{
    setShowAllNotes(e.target.checked);
  };

  const setNewScaleNotes = (newScaleRoot: string, newScale: string)=>{
    if(newScale == "" || newScaleRoot == "") {
      setScaleNotes([]);
      setScaleRoot(newScaleRoot);
      setScale(newScale);
      setInScaleGame(false);
      return;
    }
    
    const newScaleNotes = getScaleNotes(newScaleRoot, newScale);

    const octave:number = getStartingScaleOctave(newGuitarStrings[5], newScaleNotes[0]);
    
    const newScaleFrequencies:number[] = getScaleFrequencies(newScaleNotes, octave);
    playScale([...newScaleFrequencies], audioPlayer);
    setScaleFrequencies(newScaleFrequencies);
    setScale(newScale);
    setScaleRoot(newScaleRoot);
    setScaleNotes(newScaleNotes);
    setFoundScaleGameNotes([]);
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
    playScale([...scaleFrequencies], audioPlayer);
  };

  const toggleScaleGame = ()=>{
    if(inScaleGame) {
      setFoundScaleGameNotes([]);
    }
    setInScaleGame(!inScaleGame);
  };

  const noteClickHandler = (note:note)=>{
    if(!inScaleGame) return;
    const octaveScaleNotes = [...scaleNotes].slice(0, scaleNotes.length-1);    

    const expectedNote = getExpectedNote(octaveScaleNotes, foundScaleGameNotes.length);
    const expectedOctave = getExpectedOctave(octaveScaleNotes[0], expectedNote, foundScaleGameNotes);
    
    if(note.note == expectedNote) {
      if(expectedOctave && note.octave !== expectedOctave) return;
      setFoundScaleGameNotes([...foundScaleGameNotes, {...note}]);
    }
  };

  const newGuitarStrings = createStrings(tuning, showAllNotes, scaleNotes, inScaleGame, foundScaleGameNotes);

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
          inScaleGame={inScaleGame}
          onPlayScale={playScaleHandler}
          toggleScaleGame={toggleScaleGame}
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