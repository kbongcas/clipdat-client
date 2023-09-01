import Header from './components/Header'
import './App.css'
import { useAuth0 } from '@auth0/auth0-react'
import Clips from './pages/Clips'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Upload from './pages/Upload'
import Public from './pages/Public'

function App() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  console.log(isAuthenticated)
  return (
    <div className="flex flex-row">
      <div className="rounded-lg basis-full">
        <BrowserRouter base="/">
          <Header
            isAuthenticated={isAuthenticated}
            loginWithRedirect={loginWithRedirect}
          />
            <Routes>
              <Route path="/" element={ isAuthenticated ? <Clips /> : <Public />} />
              <Route path="/clips/*" element={ isAuthenticated ? <Clips /> : <Public />} />
              <Route path="/upload/*" element={ isAuthenticated ? <Upload /> : <Public />} />
              <Route path="*" element={<div>Error </div>} />
            </Routes>
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App
