import type { NextPage } from 'next'
import { ChangeEvent, MouseEvent, useState } from 'react'
import Fretboard from '../components/guitar/fretboard'
import FretboardControls from '../components/guitar/fretboardControls'
import Layout from '../components/layout'
import AudioPlayer from '../lib/AudioPlayer'
import { tunings, availableTunings } from '../lib/tunings'
import notes from '../lib/notes'
import * as f from '../lib/frequencies.json'
import ScaleDisplay from '../components/guitar/scaleDisplay'
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




const createStrings = (tuning:availableTunings, showAllNotes:boolean, scaleNotes:string[]): guitarString[] => {
  let stateStrings:guitarString[] = [];
  const standardTuning = tunings.get(tuning);
  if(!standardTuning) return stateStrings;
  for(let stringNum = 0; stringNum < 6; stringNum++) {
      let gs:guitarString = {
          openNote: standardTuning[stringNum].note,
          openOctave: standardTuning[stringNum].octave,
          openScaleNum: null,
          openVisible: scaleNotes.length == 0 && showAllNotes || scaleNotes.includes(standardTuning[stringNum].note),
          frets: [],
          stringKey: "string-" + stringNum.toString()
      }
      let notePosition = notes.indexOf(gs.openNote) + 1;
      let fretOctave = gs.openOctave;
      if(scaleNotes.includes(gs.openNote)) {
        let openScalePosition = scaleNotes.indexOf(gs.openNote);
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
          if(scaleNotes.includes(fretNote)) {
            let fretScalePosition = scaleNotes.indexOf(fretNote);
            fretScaleNum = fretScalePosition == 0 ? "T" : (fretScalePosition+1).toString();
          }

          gs.frets.push({
              note: fretNote,
              octave: fretOctave,
              visible: scaleNotes.length == 0 && showAllNotes || scaleNotes.includes(fretNote),
              scaleNum: fretScaleNum,
              fretKey: "fret-" + stringNum.toString() + "-" + fretNum.toString()
          });

          notePosition++;
      }
      stateStrings.push(gs);
  }
  return stateStrings;
}

type audioDevice = {
  label: string
  id: string
}

type audioState = {
  audioDevices?: audioDevice[],
  selectedAudioDeviceId?: string | undefined
}

let audioPlayer:AudioPlayer | null = null;
if(typeof window !== "undefined") {
  audioPlayer = new AudioPlayer();
}

const Home: NextPage = () => {
  
  let initialAudioState:audioState = {
    audioDevices: [],
    selectedAudioDeviceId: undefined
  }

  const [guitarStrings, setGuitarStrings] = useState(createStrings("standard", false, []));
  const [tuning, setTuning] = useState<availableTunings>("standard");
  const [scaleNotes, setScaleNotes] = useState<string[]>([]);
  const [scaleFrequencies, setScaleFrequencies] = useState<number[]>([]);
  const [scale, setScale] = useState("");
  const [scaleRoot, setScaleRoot] = useState("");
  const [showAllNotes, setShowAllNotes] = useState(false);
  const [audioState,setAudioState] = useState(initialAudioState);

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
    
  }
  const showNotesHandler = (e:ChangeEvent<HTMLInputElement>)=>{
    const newGuitarStrings = createStrings(tuning, e.target.checked,scaleNotes);
    setGuitarStrings(newGuitarStrings);
    setShowAllNotes(e.target.checked);
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

  const setNewScaleNotes = (newScaleRoot: string, newScale: string)=>{
    if(newScale == "" || newScaleRoot == "") {
      setScaleNotes([]);
      setScaleRoot(newScaleRoot);
      setScale(newScale);
      const newGuitarStrings = createStrings(tuning, showAllNotes, []);
      setGuitarStrings(newGuitarStrings);
      return;
    }
    
    let allNotes = [...notes,...notes];
    let newScaleNotes = [newScaleRoot];
    let scaleInts = newScale.split("").map(i=>parseInt(i));
    let startIndex = notes.indexOf(newScaleRoot);
    scaleInts.forEach(int=>{
      startIndex += int;
      newScaleNotes.push(allNotes[startIndex]);
    });

    const newGuitarStrings = createStrings(tuning, showAllNotes, newScaleNotes);

    let string = newGuitarStrings[5];
    let octave:number = 0;
    if(string.openNote == newScaleNotes[0]) {
      octave = string.openOctave;
    } else {
      string.frets.forEach(fret=>{
        if(fret.note == newScaleNotes[0]) {
          octave = fret.octave;
          return;
        }
      })
    }
    let newScaleFrequencies:number[] = [];
    if(newScaleNotes[0] in frequencies) {
      newScaleNotes = [...newScaleNotes.slice(0,newScaleNotes.length-1),...newScaleNotes];
      let previousPosition = notes.indexOf(newScaleNotes[0]);
      newScaleFrequencies = newScaleNotes.map((note,i)=>{
        let thisPosition = notes.indexOf(note);
        if((newScaleNotes[0] == "C" && i > 0 && note == "C") || previousPosition > thisPosition) {
          octave++;
        }
        previousPosition = thisPosition;
        return frequencies[note][octave];
      })
      playScale([...newScaleFrequencies]);
    }
    setScaleFrequencies(newScaleFrequencies);
    setGuitarStrings(newGuitarStrings);
    setScale(newScale);
    setScaleRoot(newScaleRoot);
    setScaleNotes(newScaleNotes);
  }

  const scaleRootHandler = (e:ChangeEvent<HTMLSelectElement>)=>{
    let newScaleRoot = e.target.value;
    setScaleRoot(newScaleRoot);
    setScaleNotes(scaleNotes);
    if((newScaleRoot !== "" || scaleRoot !== "") && scale !== "") {
      setNewScaleNotes(newScaleRoot, scale);
    }
  };
  
  const scaleHandler = (e:ChangeEvent<HTMLSelectElement>)=>{
    let newScale = e.target.value;
    setScale(newScale);
    setScaleNotes([]);
    if((newScale !== "" || scale !== "") && scaleRoot !== "") {
      setNewScaleNotes(scaleRoot, newScale);
    }    
  };
  const getStream = async (id?:string): Promise<void | MediaStream> => {
    let constraints:MediaStreamConstraints = {
      audio: true
    }
    if(id) {
      constraints.audio = {
        deviceId: id
      };
    }
    const stream = await navigator.mediaDevices.getUserMedia(constraints).catch(err=>{
      console.log(err);
    });
    return stream;
  }
  
  const getDevices = async (): Promise<audioDevice[] | null> => {
    const devices = await navigator.mediaDevices.enumerateDevices()
      .catch(err=>{
        console.log(err);
      });
    if(!devices) return null;
    let deviceList:audioDevice[] = [];
    devices.forEach(device=>{
      if(device.kind != "audioinput") {
        return;
      }
      deviceList.push({
        "label": device.label,
        "id": device.deviceId
      });
    });
    return deviceList
    
  }
  const initiateLivePlaying = async () => {
    let newState:audioState = {};
    
    const stream = await getStream();
    if(stream) {
      newState.selectedAudioDeviceId = stream.getAudioTracks()[0].getSettings().deviceId;
      audioPlayer?.playStream(stream);
    }
    const deviceList = await getDevices();
    if(deviceList) {
      newState.audioDevices = deviceList;
    }
    
    setAudioState(newState);
  }

  const audioDeviceChange = (deviceId:string) => {
    getStream(deviceId).then(stream=>{
      if(stream) {
        setAudioState({
          selectedAudioDeviceId: stream.getAudioTracks()[0].getSettings().deviceId
        });
        audioPlayer?.playStream(stream);
      }
      
    });
  }

  const renderInputOpts = () => {
    if(!audioState.audioDevices) {
      return null;
    }
    return audioState.audioDevices.map((device)=>{
      return <option key={device.id} value={device.id}>{device.label}</option>
    })
  }

  const playScaleHandler = (e:MouseEvent<HTMLButtonElement>)=>{
    if(!scaleFrequencies) {
      return false;
    }
    playScale([...scaleFrequencies]);
  }

  return (
    <Layout>
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
      <Fretboard
        guitarStrings={guitarStrings}
        audioPlayer={audioPlayer}
      ></Fretboard>
      {!audioState.audioDevices || audioState.audioDevices.length == 0 &&
        <button onClick={initiateLivePlaying}>Live</button>
      }
      {audioState.audioDevices && audioState.audioDevices.length > 0 && 
        <select onChange={(e)=>{audioDeviceChange(e.target.value)}} value={audioState.selectedAudioDeviceId}>
          {renderInputOpts()}
        </select>
      }      
    </Layout>
  )
}

export default Home
