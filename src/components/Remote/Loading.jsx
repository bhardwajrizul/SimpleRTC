export default function Loading() {
    return (
        <div className="w-full h-screen flex flex-col items-center justify-center">
            <p className="text-2xl mb-4">Generating your Answer...</p>
            <span className="loading loading-spinner text-error loading-lg mt-4"></span>
        </div>
    )
}