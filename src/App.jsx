import Sidebar from './components/Sidebar'
import Header from './components/Header'
import './App.css'
import { useAuth0 } from '@auth0/auth0-react'
import Clips from './pages/Clips'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Upload from './pages/Upload'

function App() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  console.log(isAuthenticated)
  return (
    <div className="flex flex-row">
      {isAuthenticated == true && <Sidebar />}
      <div className="rounded-lg basis-full">
        <Header
          isAuthenticated={isAuthenticated}
          loginWithRedirect={loginWithRedirect}
        />
        <BrowserRouter base="/">
          <Routes>
            <Route path="/" element={<Clips />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="*" element={<Clips />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App
