import Header from './components/Header'
import './App.css'
import { useAuth0 } from '@auth0/auth0-react'
import Clips from './pages/Clips'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Upload from './pages/Upload'
import Public from './pages/Public'
import { Tabs } from './components/Tabs'

function App() {
  const {isLoading, user } = useAuth0();
  return (
    <div className="flex flex-row">
      <div className="rounded-lg basis-full">
        <BrowserRouter base="/">
          <Header />
           { (user || isLoading) && < Tabs />}
          <Routes>
            <Route path="/" element={user || isLoading === true ? <Clips /> : <Public />} />
            <Route path="/clips/*" element={user || isLoading === true ? <Clips /> : <Public />} />
            <Route path="/upload/*" element={user || isLoading === true ? <Upload /> : <Public />} />
            <Route path="*" element={<div>Error </div>} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App
