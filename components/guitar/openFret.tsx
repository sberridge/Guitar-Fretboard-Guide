import { useState } from "react";
import AudioPlayer from "../../lib/AudioPlayer";
import * as f from '../../lib/frequencies.json'
type frequencyList = {
    [key:string]:number[]
}
const frequencies:frequencyList = f;

type openFretProps = {
    note: string
    octave: number
    visible: boolean
    scaleNum: string | null
    stringNum: number
    audioPlayer: AudioPlayer | null
}

export default function OpenFret(props:openFretProps) {

    const audioPlayer = props.audioPlayer;
    const [state,setState] = useState({
        "playing": false
    });

    const playNote = () =>{
        let note: string = props.note;
        let octave: number = props.octave;

        const noteFrequencies = frequencies[note];
        if(audioPlayer && noteFrequencies) {          
            setState({
                playing: true
            });
            audioPlayer.play(noteFrequencies[octave]);
            setTimeout(()=>{
                setState({
                    playing: false
                });
            },50);
        }
    }

    let noteClasses = [
        "note"
    ];
    if(state.playing) {
        noteClasses.push("playing");
    }
    if(props.visible) {
        noteClasses.push("show");
    }
    return <div className="fretboard__head">
        <div className="fretboard__tuning-machine"></div>
        <div onClick={()=>{playNote()}} className={noteClasses.join(" ")}>
            <span>{props.note}</span>
            <div className="note-scale-num">{props.scaleNum}</div>
        </div>
    </div>
}