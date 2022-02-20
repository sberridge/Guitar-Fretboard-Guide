import AudioPlayer from "../../lib/AudioPlayer"

type scaleDisplayProps = {
    scaleNotes: string[]
    scaleFrequencies: number[]
    audioPlayer: AudioPlayer | null
}
export default function ScaleDisplay(props:scaleDisplayProps) {
    const playNote = (i:number) => {
        console.log(props.scaleFrequencies,props.scaleFrequencies[i]);
        props.audioPlayer?.play(props.scaleFrequencies[i]);
    }
    const renderScaleNotes = ()=>{
        return props.scaleNotes.map((note,i)=>{
            return <div key={`scale-note-${i}`} onClick={()=>{playNote(i)}} className="note">
                <span>{note}</span>
                <div className="note__scale-num">{i == 0 || i == 7 ? "T" : i+1}</div>
            </div>
        })
    }
    return <div className='scale-display'>
        {renderScaleNotes()}
    </div>
}