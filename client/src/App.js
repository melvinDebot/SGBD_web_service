import { Routes, Route } from "react-router-dom"
import Home from "./views/Home"
import Details from "./views/Details"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path=":details" element={ <Details/> } />
      </Routes>
    </div>
  )
}

export default App