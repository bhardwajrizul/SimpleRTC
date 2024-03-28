export default function RemoteAnswer() {
    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold mb-1 underline ">Your Answer</h1>
            <textarea className="textarea textarea-success" rows={10} cols={40}>

            </textarea>
            <button
                className={`btn btn-success btn-outline mt-8`}>
                Start Call
            </button>
        </div>
    )
}