import "./css/app.scss";
import React from "react";
import * as ReactDOMClient from "react-dom/client";
import Header from "./components/header";
import Guitar from "./components/guitar";
import AudioPlayer from "./lib/AudioPlayer";
import LivePlayer from "./components/livePlayer";

type AppProps = {
    title:string
}

let audioPlayer:AudioPlayer | null = null;
if(typeof window !== "undefined") {
  audioPlayer = new AudioPlayer();
}

const App = ({title}: AppProps) => {
    
    return (
        <div>
            <Header
                title={title}
            ></Header>
            <LivePlayer
                audioPlayer={audioPlayer}
            ></LivePlayer>
            <Guitar
                audioPlayer={audioPlayer}
            ></Guitar>            
        </div>
    )
}

const rootEl = document.getElementById('root');

if(rootEl) {
    
    const root = ReactDOMClient.createRoot(rootEl);

    root.render(<App
        title="Guitar Scales"
    />);
}


export default App;
