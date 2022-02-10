import type { NextPage } from 'next'
import { ChangeEvent, useState } from 'react'
import Fretboard from '../components/guitar/fretboard'
import FretboardControls from '../components/guitar/fretboardControls'
import Layout from '../components/layout'
import AudioPlayer from '../lib/AudioPlayer'


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
  ],
  "ddropd": [
    {
        "note": "D",
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
  ],
  "dadgad": [
    {
        "note": "D",
        "octave": 4
    },
    {
        "note": "A",
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
  ],
  "opend": [
    {
        "note": "D",
        "octave": 4
    },
    {
        "note": "A",
        "octave": 3
    },
    {
        "note": "F#",
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

const frequencies:Map<string,number[]> = new Map();
frequencies.set('C',[
    16.35,
    32.70,
    65.41,
    130.8,
    261.6,
    523.3,
    1047,
    2093,
    4186
]);
frequencies.set('C#',[
    17.32,
    34.65,
    69.30,
    138.6,
    277.2,
    554.4,
    1109,
    2217,
    4435
]);
frequencies.set('D',[
    18.35,
    36.71,
    73.42,
    146.8,
    293.7,
    587.3,
    1175,
    2349,
    4699
]);
frequencies.set('D#',[
    19.45,
    38.89,
    77.78,
    155.6,
    311.1,
    622.3,
    1245,
    2489,
    4978
]);
frequencies.set('E',[
    20.60,
    41.20,
    82.41,
    164.8,
    329.6,
    659.3,
    1319,
    2637,
    5274
]);
frequencies.set('F',[
    21.83,
    43.65,
    87.31,
    174.6,
    349.2,
    698.5,
    1397,
    2794,
    5588
]);
frequencies.set('F#',[
    23.12,
    46.25,
    92.50,
    185.0,
    370.0,
    740.0,
    1480,
    2960,
    5920
]);
frequencies.set('G',[
    24.50,
    49.00,
    98.00,
    196.0,
    392.0,
    784.0,
    1568,
    3136,
    6272
]);
frequencies.set('G#',[
    25.96,
    51.91,
    103.8,
    207.7,
    415.3,
    830.6,
    1661,
    3322,
    6645
]);
frequencies.set('A',[
    27.50,
    55.00,
    110.0,
    220.0,
    440.0,
    880.0,
    1760,
    3520,
    7040
]);
frequencies.set('A#',[
    29.14,
    58.27,
    116.5,
    233.1,
    466.2,
    932.3,
    1865,
    3729,
    7459
]);
frequencies.set('B',[
    30.87,
    61.74,
    123.5,
    246.9,
    493.9,
    987.8,
    1976,
    3951,
    7902
]);

type availableTunings = "standard" | "dropd" | "dadgad" | "ddropd" | "opend";

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
