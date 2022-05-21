import React from "react";
import GuitarString from "./string";
import guitarString from "../types/guitarString";
import onNoteClick from "../types/onNoteClick";
function renderString(stringDetails:guitarString, onNoteClick:onNoteClick) {
    return <GuitarString
        guitarString={stringDetails}
        key={stringDetails.stringKey}
        onNoteClick={onNoteClick}
    ></GuitarString>;
}


type fretBoardProps = {
    children: guitarString[]
    onNoteClick:onNoteClick
}

export default function Fretboard({children, onNoteClick}:fretBoardProps) {
    const renderedStrings:JSX.Element[] = [];
    for(let i = 0; i < 6; i++) {
        renderedStrings.push(renderString(children[i], onNoteClick));
    }

    return <div id="fretboard" className="fretboard">
        {renderedStrings}
    </div>;
}