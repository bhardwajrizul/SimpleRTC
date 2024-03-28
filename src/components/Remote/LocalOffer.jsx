import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { configuration } from '../../utils/config';

export default function LocalOffer({ localOffer, setLocalOffer, creatingAns, setCreatingAns, remoteRef }) {
    const [err, setErr] = useState(null);

    const generateAnswer = async () => {
        setCreatingAns(true);
        // Check if the offer is valid
        try {
            const offer = JSON.parse(localOffer);
            if (offer.type !== "offer") {
                throw new Error("Invalid Offer Type");
            }
            remoteRef.current = remoteRef.current || new RTCPeerConnection(configuration);
            await remoteRef.current.setRemoteDescription(JSON.parse(localOffer));
            const answer = await remoteRef.current.createAnswer();
            await remoteRef.current.setLocalDescription(answer);
            setCreatingAns(false);
        } catch (error) {
            console.error("Invalid Offer", error);
            setLocalOffer("Invalid Offer");
            setErr(error.message);
            setCreatingAns(false);
            return;
        }

    }

    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold mb-1 underline ">Paste Offer Below</h1>
            <textarea
                className="textarea textarea-secondary"
                value={localOffer}
                onChange={e => setLocalOffer(e.target.value)}
                rows={10}
                cols={40}>
            </textarea>
            <button
                onClick={generateAnswer}
                className={`${creatingAns && 'cursor-not-allowed'} btn btn-secondary btn-outline mt-8`}
                disabled={creatingAns}>
                {
                    creatingAns 
                    ? <span className="loading loading-spinner text-secondary"></span>
                    : "Generate Answer"
                }
            </button>
        </div>
    )
}

LocalOffer.propTypes = {
    localOffer: PropTypes.string,
    setLocalOffer: PropTypes.func.isRequired,
}