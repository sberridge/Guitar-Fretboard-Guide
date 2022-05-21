import fret from './fret';
type guitarString = {
    openNote: string
    openNoteVisible:boolean
    openOctave: number
    openVisible: boolean
    openScaleNum: string | null
    stringKey: string
    frets: fret[]
}

export default guitarString;