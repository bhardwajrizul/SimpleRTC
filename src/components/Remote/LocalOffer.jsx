import PropTypes from 'prop-types';

export default function LocalOffer({ localOffer, setLocalOffer }) {

    const generateAnswer = () => {
        // Check if the offer is valid
        try {
            const offer = JSON.parse(localOffer);
            if (offer.type !== "offer") {
                throw new Error("Invalid Offer Type");
            }
        } catch (error) {
            console.error("Invalid Offer", error);
            setLocalOffer("Invalid Offer");
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
                className={`btn btn-secondary btn-outline mt-8`}>
                Check and Generate Answer
            </button>
        </div>
    )
}

LocalOffer.propTypes = {
    localOffer: PropTypes.string,
    setLocalOffer: PropTypes.func.isRequired,
}