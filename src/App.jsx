import Header from './components/Header'
import './App.css'
import { useAuth0 } from '@auth0/auth0-react'
import Clips from './pages/Clips'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Upload from './pages/Upload'
import Public from './pages/Public'
import { Tabs } from './components/Tabs'
import VerifyEmail from './pages/VerifyEmail'
import Login from './pages/Login'

function App() {
  const {isLoading, user } = useAuth0();

  const getPage = (pageToRender) => {
    if (isLoading) return;
    if (!user) return <Public />
    else {
      if (user.email_verified) return pageToRender;
      else return <VerifyEmail />
    }
  }

  return (
    <div className="flex flex-row">
      <div className="rounded-lg basis-full">
        <BrowserRouter base="/">
          <Header />
           { ( (user && user.email_verified) || isLoading) && < Tabs />}
          <Routes>
            <Route path="/" element={getPage(<Clips />)} />
            <Route path="/login" element={<Login />} />
            <Route path="/clips/*" element={getPage(<Clips />)} />
            <Route path="/upload/*" element={getPage(<Upload />)} />
            <Route path="*" element={<div>Error </div>} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App
