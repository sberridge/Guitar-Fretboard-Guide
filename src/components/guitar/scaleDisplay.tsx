import React from "react";
import { MouseEventHandler } from "react";
import Note from "./note";

type scaleDisplayProps = {
    scaleNotes: string[]
    scaleFrequencies: number[]
    inScaleGame: boolean
    onPlayScale: MouseEventHandler<HTMLButtonElement>
    toggleScaleGame: ()=>void
}
export default function ScaleDisplay({scaleFrequencies,scaleNotes,onPlayScale, inScaleGame, toggleScaleGame}:scaleDisplayProps) {
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
        <div className="columns">
            <div className="column">
                <button className="play-button" onClick={onPlayScale}></button>
            </div>
            <div className="column">
                <button className={`button is-small ${inScaleGame ? "is-danger" : "is-info"}`} onClick={toggleScaleGame}>{inScaleGame ? "Exit" : "Test Yourself"}</button>
            </div>
        </div>
    </div>;
}