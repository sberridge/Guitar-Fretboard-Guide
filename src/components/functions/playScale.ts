import AudioPlayer from "../../lib/AudioPlayer";

const playScale = (scaleFrequencies:number[], audioPlayer:AudioPlayer|null) => {
    const note = scaleFrequencies.shift();
    if(note) {
      audioPlayer?.play(note);
    }
    if(scaleFrequencies.length > 0) {
      setTimeout(()=>{
        playScale(scaleFrequencies, audioPlayer);
      },500);
    }
};

export default playScale;