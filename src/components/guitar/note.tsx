import React, { useContext } from "react";
import audioPlayerContext from "../../contexts/audioPlayerContext";
import * as f from '../../lib/frequencies.json';
type frequencyList = {
    [key:string]:number[]
}
const frequencies:frequencyList = f;

import { useState } from "react";
import note from "../types/note";

type noteProps = {
    note:string
    octave?:number
    frequency?:number
    visible: boolean
    noteVisible: boolean
    scaleNum: string | null
    onClick?:(note:note)=>void
}
export default function Note({note,octave,frequency,visible,noteVisible,scaleNum,onClick}:noteProps) {
    const audioPlayer = useContext(audioPlayerContext);

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
        if(onClick && octave) {
            onClick({note,octave});
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
        <span>{noteVisible ? note : ""}</span>
        <div className="note__scale-num">{noteVisible ? scaleNum : ""}</div>
    </div>;
}