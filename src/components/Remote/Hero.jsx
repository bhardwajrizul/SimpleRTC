import { useEffect, useRef, useState } from "react";
import LocalOffer from "./LocalOffer";
import RemoteAnswer from "./RemoteAnswer";
import { configuration } from "../../utils/config";
import getMediaStream from "../../utils/getMediaStream";

export default function Hero() {

    const [remoteOffer, setRemoteOffer] = useState(null);
    const [localOffer, setLocalOffer] = useState(null);
    const [permissionErr, setPermissionErr] = useState(null);
    const [err, setErr] = useState(null);
    const [creatingAns, setCreatingAns] = useState(false);

    const remoteRef = useRef(null);

    useEffect(() => {
        const setupConnection = async () => {
            // Setup remote connection
            remoteRef.current = remoteRef.current || new RTCPeerConnection(configuration);

            // Setup data channel for remote connection to capture messages
            remoteRef.current.ondatachannel = (e) => {
                remoteRef.current.dc = e.channel;
                remoteRef.current.dc.onopen = () => {
                    console.log("Data Channel Opened");
                };
            }

            // Add event listener to handle "onicecandidate" event for remote-connection
            remoteRef.current.onicecandidate = (e) => {
                if (e.candidate) {
                    console.log("New Ice Candidate for B: ", JSON.stringify(e.candidate));
                } else {
                    console.log("ICE Gathering Complete for B: ", remoteRef.current.localDescription);
                }
            }

            // Set up remote media stream
            // This should be done before we set the answer otherwise causes bugs in chrome
            try {
                const localStream = await getMediaStream();
                if (localStream) {
                    setPermissionErr(null);
                    localStream.getTracks().forEach(track => {
                        remoteRef.current.addTrack(track, localStream);
                    });
                } else {
                    setPermissionErr("Permission Denied");
                    setRemoteOffer("Permission Denied");
                }
            } catch (error) {
                setErr(error.message);
                setRemoteOffer("Error creating offer or setting remote description");
                console.error("Error in permissions", error);
            }

            // Create answer and set local description

        };
    })

    return (
        <div className="h-screen">
            <div className="flex flex-row flex-wrap p-4 justify-around">
                <LocalOffer
                    localOffer={localOffer}
                    setLocalOffer={setLocalOffer}
                    creatingAns={creatingAns}
                    setCreatingAns={setCreatingAns} 
                    remoteRef={remoteRef}/>
                <RemoteAnswer />
            </div>
        </div>
    )
}