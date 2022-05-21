import * as w from './guitar_wave.json';
type waveTables = {
    [key:string]:number[]
}
const waveTable:waveTables = w;
export default class AudioPlayer {
    private audioCtx = new AudioContext();
    private audio?:HTMLAudioElement;
    private currentStream?:MediaStream;

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
            0.00001,this.audioCtx.currentTime + 3
        );
    }

    playStream(stream:MediaStream) {
        const audioCtx = this.audioCtx;
        audioCtx.resume();
        if(!this.audio) {
            this.audio = document.createElement('audio');
            this.audio.onloadedmetadata = () =>{
                if(this.audio) {
                    this.audio.play();
                    this.audio.muted = true;
                }                
            };
            document.body.appendChild(this.audio);
        }
        if(this.currentStream) {
            this.currentStream.getAudioTracks()[0].stop();
        }
        this.currentStream = stream;
        this.audio.srcObject = stream;
        
        const source = audioCtx.createMediaStreamSource(stream);
        source.connect(audioCtx.destination);
    }
}