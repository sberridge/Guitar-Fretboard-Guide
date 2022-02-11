type note = {
    "note": string
    "octave": number
}

type availableTunings = "standard" | "dropd" | "dadgad" | "ddropd" | "opend";
const tunings:Map<availableTunings,note[]> = new Map([
    ["standard", [
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
    ["dropd", [
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
    ["ddropd", [
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
    ["dadgad",[
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
    ["opend", [
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

export { tunings };

export type { availableTunings };
