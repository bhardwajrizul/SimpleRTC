import PropTypes from "prop-types";
import { useEffect, useState, useContext } from "react";
import Loading from "./Loading";
import { configuration } from '../../utils/config'
import getMediaStream from "../../utils/getMediaStream";
import Error from "./Error";
import LocalOffer from "./LocalOffer";

import NavigationContext from "../../Provider/Navigaton";


export default function Hero({ localRef, peerStreamForA }) {
    const [localOffer, setLocalOffer] = useState(false);
    const [remoteAnswer, setRemoteAnswer] = useState(null);
    const [permissionErr, setPermissionErr] = useState(null);
    const [err, setErr] = useState(null);
    const [showTooltip, setShowTooltip] = useState(false);

    const { navigate } = useContext(NavigationContext);

    useEffect(() => {
        const setupConnection = async () => {
            // Setup local-connection
            localRef.current = localRef.current || new RTCPeerConnection(configuration);

            // Add data channel otherwise onicecandidate will not trigger
            const dataChannel = localRef.current.createDataChannel('chat');

            // Open data channel and log the event
            dataChannel.onopen = (e) => {
                console.log("Data Channel Opened");
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
                const localStream = await getMediaStream();
                if (localStream) {
                    setPermissionErr(null);
                    localStream.getTracks().forEach(track => {
                        localRef.current.addTrack(track, localStream);
                    });
                } else {
                    setPermissionErr("Permission Denied");
                    setLocalOffer("Permission Denied");
                }
            } catch (error) {
                setErr(error.message);
                setLocalOffer("Error creating offer or setting local description");
                console.error("Error in permissions", error);
            }

            // Add event listener to handle "ontrack" event for local-connection
            // Triggered when peer A receives media stream from peer B
            localRef.current.ontrack = (event) => {
                peerStreamForA.current.addTrack(event.track);
            };

            // Create offer and set local description
            const offer = await localRef.current.createOffer();
            await localRef.current.setLocalDescription(offer);
            console.log("Local Description Set for A: ", localRef.current.localDescription);
        };

        setupConnection();
    }, []);

    const handleStartCallLocal = async () => {
        try {
            const answer = JSON.parse(remoteAnswer);
            if (answer.type !== "answer") {
                throw new Error("Invalid Answer Type");
            }
            await localRef.current.setRemoteDescription(answer);
            console.log("Remote Description Set for A: ", localRef.current.remoteDescription);
            navigate('/call');
        } catch (error) {
            console.error("Invalid Answer", error);
            setRemoteAnswer("Invalid Answer")
            setErr(error.message);
            return;
        }
    }

    return (
        !localOffer
            ? <Loading />
            : permissionErr
                ? <Error err={'You need to allow Camera and Audio Permission!'} />
                : <div>
                    {err && <Error err={err} />}
                    {
                        !err && localOffer &&
                        <div className="min-h-screen">
                            <div className="flex flex-row flex-wrap p-4 justify-around">
                                <LocalOffer
                                    localOffer={localOffer}
                                    setLocalOffer={setLocalOffer}
                                    showTooltip={showTooltip}
                                    setShowTooltip={setShowTooltip}
                                />
                                <div className="flex flex-col items-center justify-center">
                                    <h1 className='text-cyan-600 text-xl underline mb-2 px-4'><span className='font-bold text-red-700 no-underline'>Step 2:</span> Paste The answer shared by other user!</h1>

                                    <h1 className="text-2xl font-bold mb-1 underline ">Paste Answer Below</h1>
                                    <textarea
                                        className="textarea textarea-success cursor-default"
                                        rows={10}
                                        cols={40}
                                        value={remoteAnswer || ""}
                                        onChange={e => setRemoteAnswer(e.target.value)}>

                                    </textarea>
                                    <h1 className='text-cyan-600 text-xl underline my-1'><span className='font-bold text-red-700 no-underline'>Step 3:</span> Start the call as the host</h1>
                                    <button
                                        className={`btn btn-success btn-outline mt-2 w-96`}
                                        onClick={handleStartCallLocal}>

                                        Start Call
                                    </button>
                                </div>
                            </div>
                        </div>
                    }
                </div>
    );
}


Hero.propTypes = {
    localRef: PropTypes.object,
    peerStreamForA: PropTypes.object,
    setStream: PropTypes.func
}