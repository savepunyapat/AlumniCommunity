import './App.css';
import Home from './pages/Home/Home';
import SignUp from './pages/SignUp/SignUp';
import Navbar from './components/Navbar.tsx';
import Login from './pages/Login/Login';
import { BrowserRouter as Router, Routes, Route }from 'react-router-dom';
function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
      
    </Router>
    
  );
}

export default App;
