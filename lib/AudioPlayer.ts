
export default class AudioPlayer {
    private audioCtx = new AudioContext();
    constructor() {

    }

    play(frequency:number) {
        
        
        const ocilator = this.audioCtx.createOscillator();
        ocilator.frequency.value = frequency;
        ocilator.type = "square";
        const gain = this.audioCtx.createGain();
        ocilator.connect(gain);
        gain.connect(this.audioCtx.destination);
        ocilator.start(0);
        gain.gain.exponentialRampToValueAtTime(
            0.00001,this.audioCtx.currentTime + 1
        )
        
    }
}