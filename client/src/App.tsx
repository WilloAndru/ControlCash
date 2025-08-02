import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'

function App() {
  return (
    <BrowserRouter>
      <div className='appContainer'>
        <div className='appContent'>
          <Header />
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/auth' element={<Home/>} />
            <Route path='/proyection' element={<Home/>} />
            <Route path='/profile' element={<Home/>} />
          </Routes>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
