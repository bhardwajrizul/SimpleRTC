export default async function getMediaStream() {
    try {
        const constraints = { video: true, audio: true };
        return await navigator.mediaDevices.getUserMedia(constraints);
    } catch (error) {
        console.error("Error accessing media devices:", error);
        return null;
    }
}
