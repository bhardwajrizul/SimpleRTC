import PropTypes from 'prop-types';

export default function LocalOffer({ localOffer, setLocalOffer, showTooltip, setShowTooltip }) {
    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold mb-1 underline ">Local Offer</h1>
            <textarea rows={10} cols={40}
                value={localOffer}
                // Dont let user edit the offer
                onChange={e => setLocalOffer(localOffer)}
                className="textarea textarea-success cursor-default"
                placeholder="Paste the Offer here"
                contentEditable={false}
                disabled>
            </textarea>
            <button
                onClick={() => {
                    navigator.clipboard.writeText(localOffer);
                    setShowTooltip(true);
                    setTimeout(() => setShowTooltip(false), 2000);
                }}
                tooltip-data='Copied ✅'
                disabled={showTooltip}
                className={`${showTooltip && 'u-tooltip hover:cursor-not-allowed'} btn btn-primary btn-outline mt-8`}>
                Copy and Share
            </button>
            <h1 className='text-cyan-600 text-xl underline mt-2'><span className='font-bold text-red-700 no-underline'>Step 1:</span> Share The local offer with other user!</h1>

        </div>
    )
}

// Path: src/components/Local/LocalAnswer.jsx
LocalOffer.propTypes = {
    localOffer: PropTypes.string,
    setLocalOffer: PropTypes.func,
    showTooltip: PropTypes.bool,
    setShowTooltip: PropTypes.func,
};
