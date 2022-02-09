import { useState } from "react";
import GuitarString from "./string"
function renderString(stringDetails:guitarString) {
    return <GuitarString
        guitarString={stringDetails}
        key={stringDetails.stringKey}
    ></GuitarString>
}

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

type fretBoardProps = {
    guitarStrings: guitarString[]
}

export default function Fretboard(props:fretBoardProps) {
    
    let renderedStrings:JSX.Element[] = [];
    for(let i = 0; i < 6; i++) {
        renderedStrings.push(renderString(props.guitarStrings[i]));
    }

    return <div id="fretboard">
        {renderedStrings}
    </div>
}