import PropTypes from 'prop-types';
export default function RemoteAnswer({ remoteAns, setRemoteAns, showTooltip, setShowTooltip }) {
    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold mb-1 underline ">Your Answer</h1>
            <textarea
                value={remoteAns || ""}
                className="textarea textarea-success cursor-default"
                rows={10}
                cols={40}
                onChange={(e) => setRemoteAns(remoteAns)}
                placeholder="Generate the Answer"
                contentEditable={false}
                disabled>
            </textarea>
            <button
                onClick={() => {
                    navigator.clipboard.writeText(remoteAns);
                    setShowTooltip(true);
                    setTimeout(() => setShowTooltip(false), 2000);
                }}
                tooltip-data='Copied ✅'
                disabled={showTooltip}
                className={`${showTooltip && 'u-tooltip hover:cursor-not-allowed'} btn btn-primary btn-outline mt-8`}>
                Copy and Share
            </button>
            <h1 className='text-cyan-600 text-xl underline my-2'><span className='font-bold text-red-700 no-underline'>Step 3:</span> Share the answer with other user!</h1>

        </div>
    )
}

RemoteAnswer.propTypes = {
    remoteAns: PropTypes.string,
    setRemoteAns: PropTypes.func.isRequired,
    showTooltip: PropTypes.bool.isRequired,
    setShowTooltip: PropTypes.func.isRequired,
}
