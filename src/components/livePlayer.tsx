import React, { useState } from "react";
import AudioPlayer from "../lib/AudioPlayer";

type audioDevice = {
    label: string
    id: string
}

type audioState = {
    audioDevices?: audioDevice[],
    selectedAudioDeviceId?: string | undefined
}

type livePlayerProps = {
    audioPlayer:AudioPlayer | null
}

const LivePlayer = ({audioPlayer}:livePlayerProps) => {

    let initialAudioState:audioState = {
        audioDevices: [],
        selectedAudioDeviceId: undefined
      }

    const [audioState,setAudioState] = useState(initialAudioState);

    const getStream = async (id?:string): Promise<void | MediaStream> => {
        let constraints:MediaStreamConstraints = {
            audio: true
        }
        if(id) {
            constraints.audio = {
                deviceId: id
            };
        }
        const stream = await navigator.mediaDevices.getUserMedia(constraints).catch(err=>{
            console.log(err);
        });
        return stream;
    }

    const getDevices = async (): Promise<audioDevice[] | null> => {
        const devices = await navigator.mediaDevices.enumerateDevices()
            .catch(err=>{
                console.log(err);
            });
        if(!devices) return null;
        let deviceList:audioDevice[] = [];
        devices.forEach(device=>{
            if(device.kind != "audioinput") {
                return;
            }
            deviceList.push({
                "label": device.label,
                "id": device.deviceId
            });
        });
        return deviceList

    }
    const initiateLivePlaying = async () => {
        let newState:audioState = {};

        const stream = await getStream();
        if(stream) {
            newState.selectedAudioDeviceId = stream.getAudioTracks()[0].getSettings().deviceId;
            audioPlayer?.playStream(stream);
        }
        const deviceList = await getDevices();
        if(deviceList) {
            newState.audioDevices = deviceList;
        }

        setAudioState(newState);
    }

    const audioDeviceChange = (deviceId:string) => {
        getStream(deviceId).then(stream=>{
            if(stream) {
                setAudioState({
                    selectedAudioDeviceId: stream.getAudioTracks()[0].getSettings().deviceId
                });
                audioPlayer?.playStream(stream);
            }

        });
    }

    const renderInputOpts = () => {
        if(!audioState.audioDevices) {
            return null;
        }
        return audioState.audioDevices.map((device)=>{
            return <option key={device.id} value={device.id}>{device.label}</option>
        })
    }

    return <section className="play-live-section">
        {!audioState.audioDevices || audioState.audioDevices.length == 0 &&
            <button className="play-live-button" onClick={initiateLivePlaying}>Play Live</button>
        }
        {audioState.audioDevices && audioState.audioDevices.length > 0 &&
            <div>
                <label htmlFor="live-audio-input-select">Select Input</label>
                <select id="live-audio-input-select" onChange={(e)=>{audioDeviceChange(e.target.value)}} value={audioState.selectedAudioDeviceId}>
                    {renderInputOpts()}
                </select>
            </div>
        }      
    </section>
}

export default LivePlayer;