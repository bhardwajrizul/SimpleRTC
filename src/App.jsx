import Route from "./components/Route"
import Hero from "./components/Hero"
import Theme from "./components/Theme"
import Footer from "./components/Footer"
import Header from "./components/Header"
import LocalHero from "./components/Local/Hero"

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
        <h1>Remote</h1>
      </Route>
      <Footer />
    </>
  )
}

export default App
