import React, { useEffect, useState } from 'react'
import styles from './EditBlog.module.css'
import { getBlogbyId } from '../../api/internal'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import TextInput from '../../components/TextInput/TextInput'
import { EditaBlog } from '../../api/internal'
const EditBlog = () => {
    const params = useParams();
    const BlogId = params.id;
const navigate = useNavigate();
    const [title,setTitle] = useState('');
    const [content,setContent] = useState('');
    const [picture,setPicture] = useState('');

    const getPhoto = (e)=>{
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onloadend = ()=>{
            setPicture(reader.result);
        }
    }
    const author = useSelector(state =>state.user._id);

    const UpdateHandler = async ()=>{

        let data;
if(picture.includes('http')){
    data ={
        author,
        title,
        content,
        blogId:BlogId
       }
}else{
    data ={
        author,
        title,
        content,
        photo:picture,
        blogId:BlogId
       }
}
      
       const response = await EditaBlog(data);
       if(response.status === 200 ){
        navigate(`/blog/${BlogId}`)
       }
    
    }

    useEffect(()=>{
        async function getBlogDetails(){
            const BlogResponse = await getBlogbyId(BlogId);
            if(BlogResponse.status === 200){
                setTitle(BlogResponse.data.blog.title);
                setContent(BlogResponse.data.blog.content);
                setPicture(BlogResponse.data.blog.photo)
            }
        }
        getBlogDetails();
    },[])
  return (
    <div className={styles.Wrapper}>
    <div className={styles.header}>Update Blog</div>
    <TextInput 
    type="text" placeholder="Title" name="title" style={{width:"60%"}} value={title} onChange={(e)=>setTitle(e.target.value)}/>
    <textarea name="content" onChange={(e)=>setContent(e.target.value)} className={styles.content} placeholder='Your Content Goes Here...' value={content}  maxLength={400}></textarea>
    <div className={styles.photoPrompt}>
<p>Choose a Photo</p>
<input type="file" name='photo' id='photo' accept='image/jpg image/jpeg image/png' onChange={getPhoto} />
{picture !==''?<img src={picture} width={150} height={150} alt='Selected Photo'/>:''}
    </div>
    <button disabled={title===''|| content===''|| picture===''} className={styles.submit} onClick={UpdateHandler}>Update</button>
  </div>
  )
}

export default EditBlog
