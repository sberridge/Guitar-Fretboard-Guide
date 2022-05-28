import "./css/app.scss";
import React from "react";
import * as ReactDOMClient from "react-dom/client";
import Header from "./components/header";
import Guitar from "./components/guitar";
import LivePlayer from "./components/livePlayer";
import audioPlayerContext from "./contexts/audioPlayerContext";
import AudioPlayer from "./lib/AudioPlayer";



type AppProps = {
    title:string
}

let audioPlayer:AudioPlayer | null = null;
if(typeof window !== "undefined") {
  audioPlayer = new AudioPlayer();
}


const App = ({title}: AppProps) => {
    
    return (
        <audioPlayerContext.Provider value={audioPlayer}>
        <div>
            <section className="section">
                <Header
                    title={title}
                ></Header>
            </section>
            <section className="container">
                <LivePlayer></LivePlayer>
            </section>
            <section className="section">
                <div className="container">
                    <Guitar></Guitar>    
                </div>        
            </section>
        </div>
        </audioPlayerContext.Provider>
    );
};

const rootEl = document.getElementById('root');

if(rootEl) {
    
    const root = ReactDOMClient.createRoot(rootEl);

    root.render(<App
        title="Guitar Scales"
    />);
}


export default App;
