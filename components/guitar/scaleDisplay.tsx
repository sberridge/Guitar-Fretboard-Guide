import AudioPlayer from "../../lib/AudioPlayer"
import Note from "./note";

type scaleDisplayProps = {
    scaleNotes: string[]
    scaleFrequencies: number[]
    audioPlayer: AudioPlayer | null
}
export default function ScaleDisplay(props:scaleDisplayProps) {
    const renderScaleNotes = ()=>{
        return props.scaleNotes.map((note,i)=>{
            return <Note
                        key={`scale-note-${i}`}
                        note={note}
                        scaleNum={i == 0 || i == 7 ? "T" : (i+1).toString()}
                        frequency={props.scaleFrequencies[i]}
                        visible={true}
                        audioPlayer={props.audioPlayer}
                        ></Note>
        })
    }
    return <div className='scale-display'>
        {renderScaleNotes()}
    </div>
}