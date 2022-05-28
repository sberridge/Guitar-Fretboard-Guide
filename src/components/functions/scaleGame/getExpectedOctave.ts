import note from "../../types/note";
import notes from "../../../lib/notes";

const getExpectedOctave = (routeNote:string, currentNote:string, foundNotes:note[]) => {
    let expectedOctave:number | undefined;
    if(foundNotes.length > 0) {
        expectedOctave = foundNotes[foundNotes.length - 1].octave;
        if(routeNote === "C" && currentNote === "C") {
            expectedOctave++;
        } else {
            const previousNoteIndex = notes.indexOf(foundNotes[foundNotes.length - 1].note);
            const thisNoteIndex = notes.indexOf(currentNote);
            if(thisNoteIndex < previousNoteIndex) {
                expectedOctave++;
            }
        }
    }
    return expectedOctave;
};

export default getExpectedOctave;