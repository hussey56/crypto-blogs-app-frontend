import React, { useEffect, useState } from 'react'
import styles from './BlogDetails.module.css'
import Loader from '../../components/Loader/Loader'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { postComment,getBlogbyId,getCommentsbyId,deleteBlog } from '../../api/internal'
import CommentList from '../../components/CommentList/CommentList'

const BlogDetails = () => {
    const [reload,setReload]= useState(false);
    const [blog,setBlog] = useState([]);
    const [comments,setComments] = useState([]);
    const [owns,setOwns] = useState(false);
    const [newComment,setNewComment] = useState('');
    const navigate = useNavigate();

    const params = useParams();
    const BlogId = params.id;

    const username = useSelector(state =>state.user.username);
    const userId = useSelector(state =>state.user._id);
    useEffect(()=>{
async function getBlogDetails(){

    const commentResponse = await getCommentsbyId(BlogId);
    if(commentResponse.status === 200){
        setComments(commentResponse.data.data)
    }
    const blogResponse = await getBlogbyId(BlogId);
    if(blogResponse.status === 200){
        setOwns(username === blogResponse.data.blog.authorUsername)
        setBlog(blogResponse.data.blog);

    }
}
getBlogDetails();
    },[reload]);
    const postCommentHandler =async ()=>{
const data = {
    author:userId,
    blog:BlogId,
    content:newComment
}
const response = await postComment(data);
if(response.status === 201){
    setNewComment('');
    setReload(!reload);
}
    }
    const deleteaBlog = async ()=>{
const response = await deleteBlog(BlogId);
if(response.status === 200){
    navigate('/')
}
    }
 if(blog.length === 0){
    return <Loader text={"Blog Details"}/>
 }
  return (
    <div className={styles.detailwrapper}>
      <div className={styles.left}>
        <h1 className={styles.title}>{blog.title}</h1>
        <div className={styles.meta}>
            <p>@{blog.authorUsername + " on "+ new Date(blog.createdAt).toDateString()}</p>
        </div>
        <div className={styles.photo}>
            <img src={blog.photo} height={250} width={250} alt={blog.photo} />
        </div>
        <p className={styles.content}>{blog.content}</p>

            {
                owns && (
                    <div className={styles.control}>
                        <button className={styles.edit} onClick={()=>{navigate(`/blog/update/${BlogId}`)}}>Edit</button>
                        <button className={styles.delete} onClick={deleteaBlog}>Delete</button>
                        </div>
                )
            }
      </div>
      <div className={styles.right}>
        <div className={styles.commentWrapper}>
            <CommentList comments={comments}/>
            <div className={styles.postComment}>
                <input type="text" className={styles.Input} placeholder='Enter Your Comment' value={newComment} onChange={(e)=>setNewComment(e.target.value)} />
                <button className={styles.postCommentButton} onClick={postCommentHandler}>Post</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default BlogDetails
