import { useState } from "react";
import Loading from "./Loading";

export default function Hero() {
    const [starting, setStarting] = useState(false);
    return (
        starting ? (
            <div>
                Hello Local Client
            </div>
        ) :
            (
                <Loading />
            )
    )
}