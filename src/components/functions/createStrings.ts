import createString from "./createString";
import { Tunings } from "../../lib/tunings";
import note from "../types/note";
import guitarString from "../types/guitarString";
import { tuningNotes } from "../../lib/tunings";

const createStrings = (tuning:Tunings, showAllNotes:boolean, scaleNotes:string[], inScaleGame:boolean, foundScaleGameNotes:note[]): guitarString[] => {
    const stateStrings:guitarString[] = [];
    const selectedTuning = tuningNotes.get(tuning);
    if(!selectedTuning) return stateStrings;
    for(let stringNum = 0; stringNum < 6; stringNum++) {
        stateStrings.push(createString(stringNum, selectedTuning, scaleNotes, showAllNotes, inScaleGame, foundScaleGameNotes));
    }
    return stateStrings;
};

export default createStrings;