import './App.css';
import Home from './pages/Home/Home';
import AddUser from './AdminPages/AddUser/AddUser';
import Navbar from './components/Navbar.tsx';
import Login from './pages/Login/Login';
import Logout from './pages/Logout/Logout';
import { BrowserRouter as Router, Routes, Route }from 'react-router-dom';
import axios from 'axios';
import Profile from './pages/Profile/Profile';
import Footer from './components/Footer/Footer';
import UserManage from './AdminPages/UserManage/UserManage';
import PostManage from './AdminPages/PostManage/PostManage';
import AddPost from './AdminPages/PostManage/AddPost/AddPost';
import PostDetail from './pages/News/PostDetail';
import Gallery from './pages/Gallery/Gallery';
import EditPost from './AdminPages/EditPost/EditPost';
axios.defaults.withCredentials = true;

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/admin/adduser' element={<AddUser/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/logout' exact element={<Logout/>}/>
        <Route path='/admin/users' element={<UserManage/>}/>
        <Route path='/admin/posts' element={<PostManage/>}/>
        <Route path='/admin/addPost' element={<AddPost/>}/>
        <Route path='/post/:id' exact element={<PostDetail/>}/>
        <Route path='/admin/editPost/:id' element={<EditPost/>}/>
        <Route path='/gallery' element={<Gallery/>}/>
      </Routes>
      <Footer/>
    </Router>
    
  );
}

export default App;
