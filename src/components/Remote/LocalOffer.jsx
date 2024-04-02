import PropTypes from 'prop-types';
import { useState } from 'react';

export default function LocalOffer({ localOffer, setLocalOffer, creatingAns, setCreatingAns, remoteRef, setRemoteAns }) {
    const [err, setErr] = useState(null);

    const generateAnswer = async () => {
        setCreatingAns(true);
        // Check if the offer is valid
        try {
            const offer = JSON.parse(localOffer);
            if (offer.type !== "offer") {
                throw new Error("Invalid Offer Type");
            }
            await remoteRef.current.setRemoteDescription(JSON.parse(localOffer));
            const answer = await remoteRef.current.createAnswer();
            await remoteRef.current.setLocalDescription(answer);
            console.log("Local Description Set for B: ", remoteRef.current.localDescription);
            console.log("Remote Description Set for B: ", remoteRef.current.remoteDescription);
            setRemoteAns(JSON.stringify(answer));
            setCreatingAns(false);
        } catch (error) {
            console.error("Invalid Offer", error);
            setRemoteAns("Invalid Offer");
            setErr(error.message);
            setCreatingAns(false);
            return;
        }

    }

    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className='text-cyan-600 text-xl underline mb-2'><span className='font-bold text-red-700 no-underline'>Step 1:</span> Paste the offer shared by other user</h1>
            <h1 className="text-2xl font-bold mb-1 underline ">Paste Offer Below</h1>
            <textarea
                className="textarea textarea-secondary"
                value={localOffer || ""}
                onChange={e => setLocalOffer(e.target.value)}
                rows={10}
                cols={40}>
            </textarea>
            <h1 className='text-cyan-600 text-xl underline my-2'><span className='font-bold text-red-700 no-underline'>Step 2:</span> Generate an answer!</h1>
            <button
                onClick={generateAnswer}
                className={`${creatingAns && 'cursor-not-allowed'} btn btn-secondary btn-outline mt-2`}
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
    creatingAns: PropTypes.bool.isRequired,
    setCreatingAns: PropTypes.func.isRequired,
    remoteRef: PropTypes.object.isRequired,
    setRemoteAns: PropTypes.func.isRequired,
}