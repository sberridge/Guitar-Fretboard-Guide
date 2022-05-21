import React from "react";
import { MouseEventHandler } from "react";
import AudioPlayer from "../../lib/AudioPlayer";
import Note from "./note";

type scaleDisplayProps = {
    scaleNotes: string[]
    scaleFrequencies: number[]
    audioPlayer: AudioPlayer | null
    testing: boolean
    onPlayScale: MouseEventHandler<HTMLButtonElement>
    toggleTesting: ()=>void
}
export default function ScaleDisplay({scaleFrequencies,scaleNotes,audioPlayer,onPlayScale, testing, toggleTesting}:scaleDisplayProps) {
    const renderScaleNotes = ()=>{
        return scaleNotes.map((note,i)=>{
            return <Note
                        key={`scale-note-${i}`}
                        note={note}
                        scaleNum={i == 0 || i == 7 ? "T" : (i+1).toString()}
                        frequency={scaleFrequencies[i]}
                        visible={true}
                        noteVisible={true}
                        audioPlayer={audioPlayer}
                    ></Note>;
        });
    };
    return <div className='scale-display'>
        <div className="scale-display__notes">
            {renderScaleNotes()}    
        </div>
        <button className="play-button" onClick={onPlayScale}></button>
        <button onClick={toggleTesting}>{testing ? "Cancel" : "Test yourself"}</button>
    </div>;
}