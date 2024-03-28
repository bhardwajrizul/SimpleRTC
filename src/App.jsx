import Route from "./components/Route"
import Hero from "./components/Hero"
import Theme from "./components/Theme"
import Footer from "./components/Footer"
import Header from "./components/Header"
import LocalHero from "./components/Local/Hero"
import RemoteHero from "./components/Remote/Hero"

function App() {
  return (
    <>
      <Header />
      <Theme />
      <Route path="/">
        <Hero />
      </Route>
      <Route path='/local'>
        <LocalHero />
      </Route>
      <Route path="/remote">
        <RemoteHero />
      </Route>
      <Footer />
    </>
  )
}

export default App
