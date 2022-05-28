import note from "../components/types/note";

enum Tunings {
    "standard"="standard",
    "dropd"="dropd",
    "dadgad"="dadgad",
    "ddropd"="ddropd",
    "opend"="opend"
}

const tuningNotes:Map<Tunings,note[]> = new Map([
    [Tunings.standard, [
        {
            "note": "E",
            "octave": 4
        },
        {
            "note": "B",
            "octave": 3
        },
        {
            "note": "G",
            "octave": 3
        },
        {
            "note": "D",
            "octave": 3
        },
        {
            "note": "A",
            "octave": 2
        },
        {
            "note": "E",
            "octave": 2
        }
    ]],
    [Tunings.dropd, [
        {
            "note": "E",
            "octave": 4
        },
        {
            "note": "B",
            "octave": 3
        },
        {
            "note": "G",
            "octave": 3
        },
        {
            "note": "D",
            "octave": 3
        },
        {
            "note": "A",
            "octave": 2
        },
        {
            "note": "D",
            "octave": 2
        }
    ]],
    [Tunings.ddropd, [
        {
            "note": "D",
            "octave": 4
        },
        {
            "note": "B",
            "octave": 3
        },
        {
            "note": "G",
            "octave": 3
        },
        {
            "note": "D",
            "octave": 3
        },
        {
            "note": "A",
            "octave": 2
        },
        {
            "note": "D",
            "octave": 2
        }
    ]],
    [Tunings.dadgad,[
        {
            "note": "D",
            "octave": 4
        },
        {
            "note": "A",
            "octave": 3
        },
        {
            "note": "G",
            "octave": 3
        },
        {
            "note": "D",
            "octave": 3
        },
        {
            "note": "A",
            "octave": 2
        },
        {
            "note": "D",
            "octave": 2
        }
    ]],
    [Tunings.opend, [
        {
            "note": "D",
            "octave": 4
        },
        {
            "note": "A",
            "octave": 3
        },
        {
            "note": "F#",
            "octave": 3
        },
        {
            "note": "D",
            "octave": 3
        },
        {
            "note": "A",
            "octave": 2
        },
        {
            "note": "D",
            "octave": 2
        }
    ]]
]);

export { tuningNotes };

export { Tunings };
