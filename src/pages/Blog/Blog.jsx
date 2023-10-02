import React from 'react'
import styles from './Blog.module.css'
import { useEffect,useState } from 'react' 
import { getAllBlogs } from '../../api/internal'
import Loader from '../../components/Loader/Loader'
import { useNavigate } from 'react-router-dom'
const Blog = () => {
  const navigate = useNavigate();
    const [data,setData] = useState([]);
    useEffect(()=>{
        (async function getBlogs(){
const response = await getAllBlogs();
if(response.status === 200){
    setData(response.data.blogs)
}
        })();
         //cleanup
         setData([])
    },[]);
    if(data.length === 0 ){
        return <Loader text={'Blogs'}/>
    }
  return (
    <div className={styles.blogWrapper}>
      {data.map((blog)=>(
        <div key={blog._id} className={styles.blog} onClick={()=>navigate(`/blog/${blog._id}`)}>
<h1>{blog.title}</h1>
<img src={blog.photo} alt={blog.photo} />
<p>{blog.content}</p>
            </div>
      ))}
    </div>
  )
}

export default Blog
