import PropTypes from "prop-types";
import { useEffect, useState, useContext } from "react";
import LocalOffer from "./LocalOffer";
import RemoteAnswer from "./RemoteAnswer";
import { configuration } from "../../utils/config";
import getMediaStream from "../../utils/getMediaStream";

import NavigationContext from "../../Provider/Navigaton";
import Error from "./Error";

export default function Hero({ remoteRef, peerStreamForB }) {

    const [remoteAns, setRemoteAns] = useState(null);
    const [localOffer, setLocalOffer] = useState(null);
    const [showTooltip, setShowTooltip] = useState(false);
    const [permissionErr, setPermissionErr] = useState(null);
    const [err, setErr] = useState(null);
    const [creatingAns, setCreatingAns] = useState(false);
    const [showWaitTooltip, setShowWaitTooltip] = useState(false);

    const { navigate } = useContext(NavigationContext);


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
                    setPermissionErr("You need to allow camera and microphone permissions to proceed.");
                    setLocalOffer("Permission Denied");
                }
            } catch (error) {
                setErr(error.message);
                setLocalOffer("Error creating offer or setting remote description");
                console.error("Error in permissions", error);
            }


            // Add event listener to handle "ontrack" event for remote-connection
            // Triggered when peer B receives media stream from peer A
            remoteRef.current.ontrack = (event) => {
                peerStreamForB.current.addTrack(event.track);
            };

            // Listen to connection state change and redirect to call page
            remoteRef.current.onconnectionstatechange = (e) => {
                if (remoteRef.current.connectionState === "connected") {
                    navigate("/call");
                }
            }
        };
        setupConnection();
    });

    const handleRemoteStartCall = () => {
        setShowWaitTooltip(true);
        setTimeout(() => setShowWaitTooltip(false), 2500);
    }

    return (
        <div className="min-h-screen">
            {
                permissionErr && <Error err={permissionErr} />
            }
            {
                !permissionErr && (
                    <div className="flex flex-row flex-wrap p-4 justify-around">
                        <LocalOffer
                            localOffer={localOffer}
                            setLocalOffer={setLocalOffer}
                            creatingAns={creatingAns}
                            setCreatingAns={setCreatingAns}
                            remoteRef={remoteRef}
                            setRemoteAns={setRemoteAns}
                        />
                        <RemoteAnswer
                            remoteAns={remoteAns}
                            setRemoteAns={setRemoteAns}
                            showTooltip={showTooltip}
                            setShowTooltip={setShowTooltip}
                        />
                        <div className="flex items-center justify-center flex-col">
                            <h1 className='text-cyan-600 text-xl underline mb-0 text-center'><span className='font-bold text-red-700 no-underline'>Step 4:</span> Wait for host to start call!</h1>
                            <button
                                onClick={handleRemoteStartCall}
                                tooltip-data='Waiting for host to start the call 📞'
                                disabled={showWaitTooltip}
                                className={`${showWaitTooltip && 'u-tooltip'} btn btn-success btn-outline mt-8 self-center w-96`}>
                                Start Call
                            </button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

Hero.propTypes = {
    remoteRef: PropTypes.object,
    peerStreamForB: PropTypes.object
}