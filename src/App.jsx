import Route from "./components/Route"
import Hero from "./components/Hero"
import Theme from "./components/Theme"
import Footer from "./components/Footer"
import Header from "./components/Header"
import LocalHero from "./components/Local/Hero"
import RemoteHero from "./components/Remote/Hero"
import CallHero from "./components/Call/Hero"
import { useEffect, useRef } from "react"
import { configuration } from "./utils/config"

function App() {
  const localRef = useRef(null);
  const remoteRef = useRef(null);
  let peerStreamForA = useRef(null);
  let peerStreamForB = useRef(null);

  useEffect(() => {

    localRef.current = null;
    remoteRef.current = null;
    peerStreamForA.current = new MediaStream();
    peerStreamForB.current = new MediaStream();
  }, []);

  return (
    <>
      <Header />
      <Theme />
      <Route path="/">
        <Hero />
      </Route>
      <Route path='/local'>
        <LocalHero peerStreamForA={peerStreamForA} localRef={localRef} />
      </Route>
      <Route path="/remote">
        <RemoteHero peerStreamForB={peerStreamForB} remoteRef={remoteRef} />
      </Route>
      <Route path="/call">
        <CallHero
          localRef={localRef}
          remoteRef={remoteRef}
          peerStreamForA={peerStreamForA}
          peerStreamForB={peerStreamForB} />
      </Route>
      <Footer />
    </>
  )
}

export default App
