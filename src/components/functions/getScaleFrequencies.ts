import * as f from './../../lib/frequencies.json'
import notes from './../../lib/notes'
type frequencyList = {
    [key:string]:number[]
}
const frequencies:frequencyList = f;
const getScaleFrequencies = (scaleNotes:string[], octave:number) => {
    let newScaleFrequencies:number[] = [];
    if(scaleNotes[0] in frequencies) {
        scaleNotes = [...scaleNotes.slice(0,scaleNotes.length-1),...scaleNotes];
        let previousPosition = notes.indexOf(scaleNotes[0]);
        newScaleFrequencies = scaleNotes.map((note,i)=>{
        let thisPosition = notes.indexOf(note);
        if((scaleNotes[0] == "C" && i > 0 && note == "C") || previousPosition > thisPosition) {
            octave++;
        }
        previousPosition = thisPosition;
        return frequencies[note][octave];
        })
    }
    return newScaleFrequencies;
}

export default getScaleFrequencies;