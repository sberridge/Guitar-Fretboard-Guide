import React from "react";
import AudioPlayer from "../lib/AudioPlayer";

const audioPlayerContext = React.createContext<AudioPlayer|null>(null);

export default audioPlayerContext;