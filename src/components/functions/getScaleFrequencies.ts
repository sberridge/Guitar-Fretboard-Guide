import * as f from './../../lib/frequencies.json';
import notes from './../../lib/notes';
type frequencyList = {
    [key:string]:number[]
}
const frequencies:frequencyList = f;
const getScaleFrequencies = (scaleNotes:string[], octave:number) => {
    let scaleFrequencies:number[] = [];
    if(scaleNotes[0] in frequencies) {
        scaleNotes = [...scaleNotes.slice(0,scaleNotes.length-1),...scaleNotes];
        let previousPosition = notes.indexOf(scaleNotes[0]);
        scaleFrequencies = scaleNotes.map((note,i)=>{
            const thisPosition = notes.indexOf(note);
            if((scaleNotes[0] == "C" && i > 0 && note == "C") || previousPosition > thisPosition) {
                octave++;
            }
            previousPosition = thisPosition;
            return frequencies[note][octave];
        });
    }
    return scaleFrequencies;
};

export default getScaleFrequencies;