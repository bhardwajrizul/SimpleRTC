import Link from "./Link"
export default function Header() {
    return (
        <div onClick={() => window.location.reload()} className="navbar bg-base-100">
            <Link to='/' className="btn btn-ghost text-xl u-glow">SimpleRTC</Link>
        </div>
    )
}