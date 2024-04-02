import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import getMediaStream from '../../utils/getMediaStream';

function Hero({ localRef, remoteRef, peerStreamForA, peerStreamForB }) {
    const [connected, setConnected] = useState(false);
    const [permissionErr, setPermissionErr] = useState(null);


    useEffect(() => {
        const checkConnectionState = () => {
            const localConnected = localRef.current && localRef.current.connectionState.includes("connected");
            const remoteConnected = remoteRef.current && remoteRef.current.connectionState.includes("connected");
            setConnected(localConnected || remoteConnected);
            console.log("Connection State Changed: ", " For local: ", localRef.current?.connectionState, " And For remote : ", remoteRef.current?.connectionState)
        };

        const setupConnection = async () => {
            // Add event listener to check connection state
            if (localRef.current || remoteRef.current) {
                localRef.current && localRef.current.addEventListener('connectionstatechange', checkConnectionState);
                remoteRef.current && remoteRef.current.addEventListener('connectionstatechange', checkConnectionState);
                setConnected(localRef.current?.connectionState.includes("connected") || remoteRef.current?.connectionState.includes("connected"));
            }

            // Get user media stream and display it
            try {
                const localStream = await getMediaStream();
                if (localStream) {
                    setPermissionErr(null);
                    const videoElement = document.getElementById('user-video');
                    videoElement.srcObject = localStream;
                } else {
                    setPermissionErr("Permission Denied");
                }
            } catch (error) {
                setPermissionErr(error.message);
                console.error("Error in permissions", error);
            }



            // Display the remote stream for peers
            const videoElementA = document.getElementById('peer-video-a');
            const videoElementB = document.getElementById('peer-video-b');
            if (videoElementA && localRef.current) {
                videoElementA.srcObject = peerStreamForA.current;
            }
            if (videoElementB && remoteRef.current) {
                videoElementB.srcObject = peerStreamForB.current;
            }
        };
        setupConnection();

        return () => {
            localRef.current && localRef.current.removeEventListener('connectionstatechange', checkConnectionState);
            remoteRef.current && remoteRef.current.removeEventListener('connectionstatechange', checkConnectionState);
        };
    }, [localRef, remoteRef, peerStreamForA, peerStreamForB]);

    return (
        <div className="min-h-screen flex flex-col flex-wrap items-center font-bold">
            <h1 className='text-lg'>
                Connection State :
                <span className={`ms-2 ${connected ? 'text-lime-400' : 'text-red-600'}`}>
                    {connected ? "Connected 👌" : "Not Connected 🥲"}
                </span>
            </h1>
            <h1 className='text-2xl mt-8'>
                {!connected && <p className="text-red-600">Please try establishing the call again! </p>}
            </h1>
            <div className='flex flex-row flex-wrap items-start justify-start w-full min-h-screen lg:flex-row lg:items-center lg:justify-center'>
                {
                    localRef.current &&
                    <video id='peer-video-a' className='lg:w-[50%] ' playsInline autoPlay />
                }
                {
                    remoteRef.current &&
                    <video id='peer-video-b' className='lg:w-[50%]' playsInline autoPlay />
                }
                {
                    !permissionErr &&
                    <video id='user-video' className='lg:w-[50%]' muted playsInline autoPlay />
                }
            </div>

        </div>
    )
}

export default Hero;

Hero.propTypes = {
    localRef: PropTypes.object,
    remoteRef: PropTypes.object,
    peerStreamForA: PropTypes.object,
    peerStreamForB: PropTypes.object,
    stream: PropTypes.object
};
