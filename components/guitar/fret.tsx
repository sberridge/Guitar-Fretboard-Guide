import * as f from '../../lib/frequencies.json'
type frequencyList = {
    [key:string]:number[]
}
const frequencies:frequencyList = f;
import AudioPlayer from '../../lib/AudioPlayer'
import { useState } from 'react';

type fretProps = {
    note: string
    visible: boolean
    octave: number
    fretKey: string
    scaleNum: string | null
    audioPlayer: AudioPlayer | null
}
export default function Fret(props:fretProps) {

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
            })
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

    return <div className="fretboard__fret">
        <div className="fretboard__fret-string"></div>
        <div onClick={()=>{playNote()}} className={noteClasses.join(" ")}>
            <span>{props.note}</span>
            <div className="note__scale-num">{props.scaleNum}</div>
        </div>
    </div>
}