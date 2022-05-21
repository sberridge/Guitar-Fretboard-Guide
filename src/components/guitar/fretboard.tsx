import React from "react";
import AudioPlayer from "../../lib/AudioPlayer";
import GuitarString from "./string";
import guitarString from "../types/guitarString";
function renderString(stringDetails:guitarString,audioPlayer: AudioPlayer | null) {
    return <GuitarString
        guitarString={stringDetails}
        audioPlayer={audioPlayer}
        key={stringDetails.stringKey}
    ></GuitarString>;
}


type fretBoardProps = {
    guitarStrings: guitarString[]
    audioPlayer:AudioPlayer | null
}

export default function Fretboard({guitarStrings, audioPlayer}:fretBoardProps) {
    const renderedStrings:JSX.Element[] = [];
    for(let i = 0; i < 6; i++) {
        renderedStrings.push(renderString(guitarStrings[i],audioPlayer));
    }

    return <div id="fretboard" className="fretboard">
        {renderedStrings}
    </div>;
}