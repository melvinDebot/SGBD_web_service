import { Routes, Route } from "react-router-dom"
import Home from "./views/Home"
import Table from "./views/Table"
import Details from "./views/Details"
import './App.css'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path=":database" element={ <Table/> } />
        <Route path=":database/:table" element={ <Details/> } />
      </Routes>
    </div>
  )
}

export default App