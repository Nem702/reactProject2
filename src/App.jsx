import Features from "./components/Features"
import Hero from "./components/Hero"
import Highlights from "./components/Highlights"
import Navbar from "./components/Navbar"


const App = () => {

  return (
    <main className="bg-black">
      <Navbar />
      <Hero />
      <Highlights />
      <Features />
    </main>
  )
}

export default App
