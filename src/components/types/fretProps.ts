import AudioPlayer from "../../lib/AudioPlayer";
import note from "./note";

type fretProps = {
    note: string
    octave: number
    visible: boolean
    noteVisible: boolean
    scaleNum: string | null
    audioPlayer: AudioPlayer | null
    onNoteClick?: (note:note)=>void
}

export default fretProps;