import Link from "./Link";
import SDP from '../../images/SDP.png'

export default function Hero() {
    return (
        <div className="hero min-h-screen bg-base-200 w-full">
            <div className="hero-content text-center w-full">
                <div className="w-full flex flex-col items-center md:items-stretch justify-between">
                    <h1 className="text-4xl lg:text-8xl font-bold">Hello there</h1>
                    <h2 className="text-2xl lg:text-5xl font-bold u-glow mx-auto">Welcome to SimpleRTC</h2>
                    <div className="max-w-xl self-center">
                        <p className="pt-6">A video call application built on top of
                            <span className="underline ms-1">
                                <a href="https://webrtc.org/" target="_blank">
                                    WebRTC
                                </a>
                            </span>.
                            The application is purely client based meaning there are no servers* involved in any way shape or form.</p>
                        <p className="pb-6 text-md">Just Two Clients communicating amongst each other.</p>
                    </div>
                    <div className="flex flex-col md:flex-row items-stretch justify-around mt-6 mb-8">
                        <div className="flex flex-col bg-transparent border border-black rounded-lg shadow-xl p-6 u-glow rotate-180 mb-8">
                            <div className="flex flex-col space-y-4 md:w-96 rotate-180">
                                <img src="https://www.vectorlogo.zone/logos/firebase/firebase-ar21.svg" alt="Use Firebase" className="w-32 h-auto mx-auto translate -translate-y-5" />
                                <Link to='/localfirebase' className="btn btn-ghost text-black btn-lg border-slate-300">Start call (automatically)</Link>
                                <Link to='/remotefirebase' className="btn btn-active btn-lg">Join call (automatically)</Link>
                            </div>
                        </div>
                        <div className="flex flex-col bg-transparent border border-black rounded-lg shadow-xl p-6 u-glow mb-8">
                            <div className="flex flex-col space-y-4 md:w-96">
                                <img src={SDP} alt="Use Firebase" className="w-32 h-auto mx-auto" />                                
                                <Link to='/local' className="btn btn-ghost text-black btn-lg border-slate-300">Start a call (manually)</Link>
                                <Link to='/remote' className="btn btn-active btn-lg">Join a call (manually)</Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}