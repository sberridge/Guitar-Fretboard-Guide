import note from "./note";

type fretProps = {
    note: string
    octave: number
    visible: boolean
    noteVisible: boolean
    scaleNum: string | null
    onNoteClick?: (note:note)=>void
}

export default fretProps;