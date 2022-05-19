import React from "react";
import { MouseEventHandler } from "react";
import AudioPlayer from "../../lib/AudioPlayer"
import Note from "./note";

type scaleDisplayProps = {
    scaleNotes: string[]
    scaleFrequencies: number[]
    audioPlayer: AudioPlayer | null
    onPlayScale: MouseEventHandler<HTMLButtonElement>
}
export default function ScaleDisplay({scaleFrequencies,scaleNotes,audioPlayer,onPlayScale}:scaleDisplayProps) {
    const renderScaleNotes = ()=>{
        return scaleNotes.map((note,i)=>{
            return <Note
                        key={`scale-note-${i}`}
                        note={note}
                        scaleNum={i == 0 || i == 7 ? "T" : (i+1).toString()}
                        frequency={scaleFrequencies[i]}
                        visible={true}
                        audioPlayer={audioPlayer}
                        ></Note>
        })
    }
    return <div className='scale-display'>
        <div className="scale-display__notes">
            {renderScaleNotes()}    
        </div>
        <button className="play-button" onClick={onPlayScale}></button>
    </div>
}