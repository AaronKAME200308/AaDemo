import Navbar from './component/Navbar'
import Home from './component/Home'
import Footer from './component/Footer'

function App() {
 

  return (
    <div className="min-h-screen w-screen flex flex-col bg-portfolio-bg text-white">
      <Navbar />
      <Home />
      <Footer />
    </div>
  )
}

export default App
