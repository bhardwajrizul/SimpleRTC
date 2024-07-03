import { useEffect } from "react";
import { getDatabase, ref, set } from "firebase/database";
import { useContext } from "react";
import { nanoid } from "nanoid";

import NavigationContext from "../../Provider/Navigaton";
import { app } from "../../utils/firebase";
import { configuration } from "../../utils/config";
import getMediaStream from "../../utils/getMediaStream";

const db = getDatabase(app);

export default function Hero({ localRef, peerStreamForA }) {

    let link = 'https://www.google.com';
    const { currentPath, navigate } = useContext(NavigationContext);
    const [loading, setLoading] = useState(true);
    const [id, setId] = useState('');
    const [localOffer, setLocalOffer] = useState('');
    const [permissionErr, setPermissionErr] = useState(null);
    const [err, setErr] = useState(null);

    useEffect(() => {
        const newId = nanoid();
        if (id === '') {
            setId(newId);
        }
        const setupConnection = async () => {
            localRef.current = localRef.current || new RTCPeerConnection(configuration);
            const dataChannel = localRef.current.createDataChannel('chat');
            dataChannel.onopen = (e) => {
                console.log("Data Channel Opened");
            }
            localRef.current.onicecandidate = (e) => {
                if (e.candidate) {
                    console.log("New Ice Candidate for A: ", JSON.stringify(e.candidate));
                } else {
                    console.log("ICE Gathering Complete for A: ", localRef.current.localDescription);
                    setLocalOffer(JSON.stringify(localRef.current.localDescription));
                }
            }
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
            localRef.current.ontrack = (e) => {
                peerStreamForA.current.addTrack(e.track);
            }
            const offer = await localRef.current.createOffer();
            await localRef.current.setLocalDescription(offer);
            console.log("Local Description Set for A: ", localRef.current.localDescription);
        };

        setupConnection(); // TODO LATER
    }, [])


    const handleClick = () => {
        const dbRef = ref(db, 'sdp/test');
        set(dbRef, { testValue: 'Hello, Firebase!' })
            .then(() => {
                console.log('Data written successfully!');
            })
            .catch((error) => {
                console.error('Error writing data:', error);
            });
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content justify-around w-full flex-col lg:flex-row-reverse">
                <img src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg" className="max-w-sm rounded-lg shadow-2xl" />
                <div>
                    <h1 className="text-3xl font-bold">Share this link!</h1>
                    <a onClick={() => console.log('link')} className="py-6 block">
                        <span className="text-blue-600 cursor-pointer">
                            {link}
                        </span>
                    </a>
                    <button onClick={handleClick} className="btn btn-primary">Start Call</button>
                </div>
            </div>
        </div>
    )
} 