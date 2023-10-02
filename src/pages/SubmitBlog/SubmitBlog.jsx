import React from 'react'
import styles from './SubmitBlog.module.css'
import { submitBlog } from '../../api/internal'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import TextInput  from '../../components/TextInput/TextInput';
import { useNavigate } from 'react-router-dom'
const SubmitBlog = () => {
    const navigate = useNavigate();
    const [title,setTitle] = useState('');
    const [content,setContent] = useState('');
    const [picture,setPicture] =useState('');
    const author = useSelector(state =>state.user._id);
    const getPhoto = (e)=>{
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onloadend = ()=>{
            setPicture(reader.result);
        }
    }
const submitHandler = async ()=>{
    const data = {
        author,
        title,content,
        photo:picture
    }
    const response = await submitBlog(data);
    if(response.status === 201){
navigate('/blogs')
    }

}
  return (
    <div className={styles.Wrapper}>
      <div className={styles.header}>Create a Blog</div>
      <TextInput 
      type="text" placeholder="Title" name="title" style={{width:"60%"}} value={title} onChange={(e)=>setTitle(e.target.value)}/>
      <textarea name="content" onChange={(e)=>setContent(e.target.value)} className={styles.content} placeholder='Your Content Goes Here...' value={content}  maxLength={400}></textarea>
      <div className={styles.photoPrompt}>
<p>Choose a Photo</p>
<input type="file" name='photo' id='photo' accept='image/jpg image/jpeg image/png' onChange={getPhoto} />
{picture !==''?<img src={picture} width={150} height={150} alt='asuhdui'/>:''}
      </div>
      <button disabled={title===''|| content===''|| picture===''} className={styles.submit} onClick={submitHandler}>Submit</button>
    </div>
  )
}

export default SubmitBlog
