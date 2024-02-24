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
import EditGallery from './AdminPages/EditGallery/EditGallery';
import SendPostcard from './AdminPages/SendPostcard/SendPostcard.js';
import GalleryPreview from './pages/GalleryPreview/GalleryPreview.js';
import AlumniSearch from './pages/AlumniSearch/AlumniSearch.js';
import Contact from './pages/Contact/Contact.js';
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
        <Route path='/admin/editGallery/:id' element={<EditGallery/>}/>
        <Route path='/admin/sendPostcard' element={<SendPostcard/>}/>
        <Route path='/gallery/galleryPreview/:id' element={<GalleryPreview/>}/>
        <Route path='/alumni' element={<AlumniSearch/>}/>
        <Route path='/contact' element={<Contact/>}/>
      </Routes>
      <Footer/>
    </Router>
    
  );
}

export default App;
