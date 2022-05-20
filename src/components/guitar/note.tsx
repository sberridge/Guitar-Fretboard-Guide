import React from "react";
import * as f from '../../lib/frequencies.json';
type frequencyList = {
    [key:string]:number[]
}
const frequencies:frequencyList = f;

import { useState } from "react";
import AudioPlayer from "../../lib/AudioPlayer";

type noteProps = {
    note:string
    octave?:number
    frequency?:number
    audioPlayer:AudioPlayer | null
    visible: boolean
    scaleNum: string | null
}
export default function Note({note,octave,frequency,audioPlayer,visible,scaleNum}:noteProps) {


    const [state,setState] = useState({
        "playing": false
    });

    const playNote = () =>{
        
        let frequencyToPlay:number|null = null;
        if(octave) {
            const noteFrequencies = frequencies[note];
            if(noteFrequencies) {
                frequencyToPlay = noteFrequencies[octave];
            }
        } else if(frequency) {
            frequencyToPlay = frequency;
        }

        if(audioPlayer && frequencyToPlay) {
            setState({
                playing: true
            });
            audioPlayer.play(frequencyToPlay);
            setTimeout(()=>{
                setState({
                    playing: false
                });
            },50);
        }
        
    };


    const noteClasses = [
        "note"
    ];
    if(state.playing) {
        noteClasses.push("playing");
    }
    if(visible) {
        noteClasses.push("show");
    }

    return <div onClick={()=>{playNote();}} className={noteClasses.join(" ")}>
        <span>{note}</span>
        <div className="note__scale-num">{scaleNum}</div>
    </div>;
}