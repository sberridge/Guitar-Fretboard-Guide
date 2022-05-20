import notes from "../../lib/notes";
const getScaleNotes = (root: string, scale:string) => {
    const allNotes = [...notes,...notes];
    const newScaleNotes = [root];
    const scaleInts = scale.split("").map(i=>parseInt(i));
    let startIndex = notes.indexOf(root);
    scaleInts.forEach(int=>{
        startIndex += int;
        newScaleNotes.push(allNotes[startIndex]);
    });
    return newScaleNotes;
};

export default getScaleNotes;