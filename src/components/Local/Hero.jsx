import { useEffect, useRef, useState } from "react";
import Loading from "./Loading";
import { configuration } from '../../utils/config'
import getMediaStream from "../../utils/getMediaStream";
import Error from "./Error";
import LocalOffer from "./LocalOffer";

export default function Hero() {
    const [localOffer, setLocalOffer] = useState(false);
    const [permissionErr, setPermissionErr] = useState(null);
    const [err, setErr] = useState(null);
    const [showTooltip, setShowTooltip] = useState(false);
    const localRef = useRef(null);

    useEffect(() => {
        const setupConnection = async () => {
            // Setup local-connection
            localRef.current = localRef.current || new RTCPeerConnection(configuration);

            // Add data channel otherwise onicecandidate will not trigger
            const dataChannel = localRef.current.createDataChannel('chat');

            // Open data channel and log the event
            dataChannel.onopen = (e) => {
                console.log("Data Channel Opened", e.channel);
            };

            // Add event listener to handle "onicecandidate" event for local-connection
            localRef.current.onicecandidate = (e) => {
                if (e.candidate) {
                    console.log("New Ice Candidate for A: ", JSON.stringify(e.candidate));
                } else {
                    console.log("ICE Gathering Complete for A: ", localRef.current.localDescription);
                    setLocalOffer(JSON.stringify(localRef.current.localDescription));
                }
            };


            // Set up local media stream
            // This should be done before we set the offer otherwise causes bugs in chrome 
            try {
                // const localStream = await getMediaStream();
                // if (localStream) {
                //     setPermissionErr(null);
                //     localStream.getTracks().forEach(track => {
                //         localRef.current.addTrack(track, localStream);
                //     });
                // } else {
                //     setPermissionErr("Permission Denied");
                //     setLocalOffer("Permission Denied");
                // }
            } catch (error) {
                setErr(error.message);
                setLocalOffer("Error creating offer or setting local description");
                console.error("Error in permissions", error);
            }

            // Create offer and set local description
            const offer = await localRef.current.createOffer();
            await localRef.current.setLocalDescription(offer);
            console.log("Local Description Set for A: ", localRef.current.localDescription);
        };

        setupConnection();
    }, []);


    return (
        !localOffer
            ? <Loading />
            : permissionErr
                ? <Error err={'You need to allow Camera and Audio Permission!'} />
                : <div>
                    {err && <Error err={err} />}
                    {
                        !err && localOffer &&
                        <div className="h-screen">
                            <div className="flex flex-row flex-wrap p-4 justify-around">
                                <LocalOffer
                                    localOffer={localOffer}
                                    setLocalOffer={setLocalOffer}
                                    showTooltip={showTooltip}
                                    setShowTooltip={setShowTooltip}
                                />
                                <div className="flex flex-col items-center justify-center">
                                    <h1 className="text-2xl font-bold mb-1 underline ">Paste Answer Below</h1>
                                    <textarea className="textarea textarea-success cursor-default" rows={10} cols={40}>
                                        
                                    </textarea>
                                    <button
                                        className={`btn btn-success btn-outline mt-8`}>
                                        Start Call
                                    </button>
                                </div>
                            </div>
                        </div>
                    }
                </div>
    );
}
