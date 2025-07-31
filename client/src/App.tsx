import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

function App() {
  return (
    <BrowserRouter>
      <div className='appContainer'>
        <Header />
        <Routes>
          <Route path='/' />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
