import React from "react";
import AudioPlayer from "../../lib/AudioPlayer";
import GuitarString from "./string"
function renderString(stringDetails:guitarString,audioPlayer: AudioPlayer | null) {
    return <GuitarString
        guitarString={stringDetails}
        audioPlayer={audioPlayer}
        key={stringDetails.stringKey}
    ></GuitarString>
}
type playNoteFunc = (stringNum:number, fretNum:number)=>void
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

type fretBoardProps = {
    guitarStrings: guitarString[]
    audioPlayer:AudioPlayer | null
}

export default function Fretboard(props:fretBoardProps) {
    let renderedStrings:JSX.Element[] = [];
    for(let i = 0; i < 6; i++) {
        renderedStrings.push(renderString(props.guitarStrings[i],props.audioPlayer));
    }

    return <div id="fretboard" className="fretboard">
        {renderedStrings}
    </div>
}