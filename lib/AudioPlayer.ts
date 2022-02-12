import * as w from './guitar_wave.json';
type waveTables = {
    [key:string]:number[]
}
const waveTable:waveTables = w;
export default class AudioPlayer {
    private audioCtx = new AudioContext();
    constructor() {

    }

    play(frequency:number) {
        
        
        const ocilator = this.audioCtx.createOscillator();
        const wave = this.audioCtx.createPeriodicWave(waveTable.real, waveTable.imag);
        ocilator.frequency.value = frequency;
        ocilator.setPeriodicWave(wave);
        const gain = this.audioCtx.createGain();
        ocilator.connect(gain);
        gain.connect(this.audioCtx.destination);
        ocilator.start(0);
        gain.gain.exponentialRampToValueAtTime(
            0.00001,this.audioCtx.currentTime + 1
        )
        
    }
}