const getExpectedNote = (scaleNotes:string[], foundNotes:number) => {
    let nextNoteIndex:number = foundNotes == 0 ? 0 : foundNotes;

    const octavesComplete = Math.floor(foundNotes / scaleNotes.length);

    if(nextNoteIndex >= scaleNotes.length) {      
        nextNoteIndex = nextNoteIndex - (scaleNotes.length * octavesComplete);
    }

    const expectedNote = scaleNotes[nextNoteIndex];
    return expectedNote;
};

export default getExpectedNote;