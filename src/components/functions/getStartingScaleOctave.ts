import guitarString from "../types/guitarString";
const memo:Map<string,number> = new Map();
const getStartingScaleOctave = (string:guitarString, note:string) => {
    const memoKey = `${string.openNote} : ${note}`;
    let octave = memo.get(memoKey);
    if(octave) {
        return octave;
    }
    octave = 0;
    if(string.openNote == note) {
        octave = string.openOctave;
    } else {
        for(const i in string.frets) {
            if(string.frets[i].note === note) {
                octave = string.frets[i].octave;
                break;
            }
        }
    }
    memo.set(memoKey, octave);
    return octave;
};
export default getStartingScaleOctave;