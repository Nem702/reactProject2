import Features from "./components/Features"
import Hero from "./components/Hero"
import Highlights from "./components/Highlights"
import HowItWorks from "./components/HowItWorks"
import Navbar from "./components/Navbar"


const App = () => {

  return (
    <main className="bg-black">
      <Navbar />
      <Hero />
      <Highlights />
      <Features />
      <HowItWorks />
    </main>
  )
}

export default App
