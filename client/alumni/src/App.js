import './App.css';
import { useAuth  } from './Context/auth.js';
import Home from './pages/Home/Home';
import AddUser from './AdminPages/AddUser/AddUser';
import Navbar from './components/Navbar';
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
import EditGallery from './AdminPages/EditGallery/EditGallery';
import SendPostcard from './AdminPages/SendPostcard/SendPostcard.js';
import GalleryPreview from './pages/GalleryPreview/GalleryPreview.js';
import AlumniSearch from './pages/AlumniSearch/AlumniSearch.js';
import Contact from './pages/Contact/Contact.js';
import ReloadAndNavigate from './components/ReloadNavigate/ReloadNavigate.js';
axios.defaults.withCredentials = true;

function App() {
  const { isLoggedIn,isAdmin } = useAuth();
  return (
    <Router>
      <Navbar/>
      <ReloadAndNavigate/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/admin/adduser' element={isLoggedIn && isAdmin ? <AddUser/> : <Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/profile' element={isLoggedIn ? <Profile/> : <Login/>}/>
        <Route path='/logout' exact element={<Logout/>}/>
        <Route path='/admin/users' element={isLoggedIn && isAdmin ? <UserManage/> : <Home/>}/>
        <Route path='/admin/posts' element={isLoggedIn && isAdmin ? <PostManage/> : <Home/>}/>
        <Route path='/admin/addPost' element={isLoggedIn && isAdmin ? <AddPost/> : <Home/>}/>
        <Route path='/post/:id' exact element={<PostDetail/>}/>
        <Route path='/admin/editPost/:id' element={isLoggedIn && isAdmin ? <EditPost/> : <Home/>}/>
        <Route path='/gallery' element={<Gallery/>}/>
        <Route path='/admin/editGallery/:id' element={isLoggedIn && isAdmin ? <EditGallery/> : <Home/>}/>
        <Route path='/admin/sendPostcard' element={isAdmin && isLoggedIn ? <SendPostcard/> : <Home/>}/>
        <Route path='/gallery/galleryPreview/:id' element={<GalleryPreview/>}/>
        <Route path='/alumni' element={isLoggedIn ? <AlumniSearch/> : <Login/>}/>
        <Route path='/contact' element={<Contact/>}/>
      </Routes>
      <Footer/>
    </Router>
    
  );
}

export default App;
