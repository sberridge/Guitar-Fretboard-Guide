import React from "react";
import { MouseEventHandler } from "react";
import Note from "./note";

type scaleDisplayProps = {
    scaleNotes: string[]
    scaleFrequencies: number[]
    testing: boolean
    onPlayScale: MouseEventHandler<HTMLButtonElement>
    toggleTesting: ()=>void
}
export default function ScaleDisplay({scaleFrequencies,scaleNotes,onPlayScale, testing, toggleTesting}:scaleDisplayProps) {
    const renderScaleNotes = ()=>{
        return scaleNotes.map((note,i)=>{
            return <Note
                        key={`scale-note-${i}`}
                        note={note}
                        scaleNum={i == 0 || i == 7 ? "T" : (i+1).toString()}
                        frequency={scaleFrequencies[i]}
                        visible={true}
                        noteVisible={true}
                    ></Note>;
        });
    };
    return <div className='scale-display'>
        <div className="scale-display__notes">
            {renderScaleNotes()}    
        </div>
        <button className="play-button" onClick={onPlayScale}></button>
        <button className="button is-white is-small mt-2" onClick={toggleTesting}>{testing ? "Cancel" : "Test Yourself"}</button>
    </div>;
}