import notes from "../../lib/notes";
const getScaleNotes = (root: string, scale:string) => {
    let allNotes = [...notes,...notes];
    let newScaleNotes = [root];
    let scaleInts = scale.split("").map(i=>parseInt(i));
    let startIndex = notes.indexOf(root);
    scaleInts.forEach(int=>{
        startIndex += int;
        newScaleNotes.push(allNotes[startIndex]);
    });
    return newScaleNotes;
}

export default getScaleNotes;