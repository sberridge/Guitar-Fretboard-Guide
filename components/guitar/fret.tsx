import frequencies from '../../lib/frequencies'
import AudioPlayer from '../../lib/AudioPlayer'
import { useState } from 'react';

type fretProps = {
    note: string
    visible: boolean
    octave: number
    fretKey: string
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
        
        const noteFrequencies = frequencies.get(note);
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

    return <div className="fret">
        <div className="fret-string"></div>
        <div onClick={()=>{playNote()}} className={noteClasses.join(" ")}>
            <span>{props.note}</span>
            <div className="note-scale-num"></div>
        </div>
    </div>
}