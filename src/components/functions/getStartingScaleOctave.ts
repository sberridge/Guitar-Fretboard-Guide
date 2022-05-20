import guitarString from "../types/guitarString";
const getStartingScaleOctave = (string:guitarString, note:string) => {
    let octave = 0;
    if(string.openNote == note) {
        return string.openOctave;
    } else {
        string.frets.forEach(fret=>{
            if(fret.note == note) {
                octave = fret.octave;
            }
        });
    }
    return octave;
};
export default getStartingScaleOctave;