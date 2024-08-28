import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './admin/src/components/login/Login.jsx';


function App() {

  return (
    <>
      <h1>Flying Teapot</h1>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
