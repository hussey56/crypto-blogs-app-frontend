import Footer from "./components/Footer/Footer";
import Error from './pages/Error/Error';
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import styles from './App.module.css'
import Protected from './components/Protected/Protected'
import Login from "./pages/Login/Login";
import { useSelector } from "react-redux";
import Signup from "./pages/Signup/Signup";
import Crypto from "./pages/Crypto/Crypto";
import Blog from "./pages/Blog/Blog";
import SubmitBlog from "./pages/SubmitBlog/SubmitBlog";
import BlogDetails from "./pages/BlogDetails/BlogDetails";
import EditBlog from "./pages/EditBlog/EditBlog";
import useAutoLogin from "./hooks/useAutoLogin";
import Loader from "./components/Loader/Loader";

function App() {
  const isAuth = useSelector((state)=>state.user.auth);
  const loading = useAutoLogin();

  return loading ? <Loader text={'...'}/> : (
  <div className={styles.container}>
    <BrowserRouter>
    <div className={styles.layout}>
      <Navbar/>
      <Routes>
        {/* Home Route */}
<Route path="/" exact element={
<div className={styles.main}>
  <Home/>
</div>}/>
{/*Blog Route*/}
<Route path="/blogs" exact element={
   <Protected isAuth={isAuth}>
<div className={styles.main}>
  <Blog/>
</div>
</Protected>}/>

{/*Crypto Route*/}
<Route path="/crypto" exact element={
<div className={styles.main}>
  <Crypto/>
</div>}/>

{/*Single Blog Route*/}
<Route path="/blog/:id" exact element={
   <Protected isAuth={isAuth}>
<div className={styles.main}>
  <BlogDetails/>
</div></Protected>}/>

{/*Edit Blog Route*/}
<Route path="/blog/update/:id" exact element={
  <Protected isAuth={isAuth}>
<div className={styles.main}>
  <EditBlog/>
</div>
</Protected>}/>

{/*Create Blog Route*/}
<Route path="/create" exact element={
  <Protected isAuth={isAuth}>
<div className={styles.main}>
 <SubmitBlog/>
</div>
  </Protected>
}
/>

{/*Login Route*/}
<Route path="/login" exact element={
<div className={styles.main}>
  <Login/>
</div>}/>

{/*Register Route*/}
<Route path="/signup" exact element={
<div className={styles.main}>
  <Signup/>
</div>}/>

{/*Error Page */}
<Route path="*" exact element={
<div className={styles.main}>
  <Error/>
</div>}/>
      </Routes>
      <Footer/>
    </div>
    </BrowserRouter>
  </div>
  );
}

export default App;
