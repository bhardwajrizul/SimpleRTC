import Link from "./Link";

export default function Hero() {
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content text-center">
                <div className="max-w-xl">
                    <h1 className="text-4xl lg:text-8xl font-bold">Hello there</h1>
                    <h2 className="text-2xl lg:text-5xl font-bold u-glow mx-auto">Welcome to SimpleRTC</h2>
                    <p className="pt-6">A video call application built on top of
                        <span className="underline ms-1">
                            <a href="https://webrtc.org/" target="_blank">
                                WebRTC
                            </a>
                        </span>.
                        The application is purely client based meaning there are no servers* involved in any way shape or form.</p>
                    <p className="pb-6 text-md">Just Two Clients communicating amongst each other.</p>
                    <div className="flex flex-col">
                        <Link to='/local' className="btn btn-outline btn-info mt-4 btn-lg">Start a Call</Link>
                        <Link to='/remote' className="btn btn-outline btn-accent mt-4 btn-lg">Join a call</Link>
                    </div>

                </div>
            </div>
        </div>
    )
}