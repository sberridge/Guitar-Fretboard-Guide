import React from "react";
import AudioPlayer from "../../lib/AudioPlayer";
import GuitarString from "./string";
import guitarString from "../types/guitarString";
import onNoteClick from "../types/onNoteClick";
function renderString(stringDetails:guitarString,audioPlayer: AudioPlayer | null, onNoteClick:onNoteClick) {
    return <GuitarString
        guitarString={stringDetails}
        audioPlayer={audioPlayer}
        key={stringDetails.stringKey}
        onNoteClick={onNoteClick}
    ></GuitarString>;
}


type fretBoardProps = {
    children: guitarString[]
    audioPlayer:AudioPlayer | null
    onNoteClick:onNoteClick
}

export default function Fretboard({children, audioPlayer, onNoteClick}:fretBoardProps) {
    const renderedStrings:JSX.Element[] = [];
    for(let i = 0; i < 6; i++) {
        renderedStrings.push(renderString(children[i],audioPlayer, onNoteClick));
    }

    return <div id="fretboard" className="fretboard">
        {renderedStrings}
    </div>;
}