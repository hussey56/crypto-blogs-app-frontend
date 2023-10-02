import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_INTERNAL_API_PATH,
    withCredentials:true,
    headers:{
        "Content-Type":"application/json",
    },
});
export const login = async(data)=>{
    let response ;
    try {
        response = await api.post('/login',data);
    } catch (error) {
        return error;
    }
    return response;
}
export const signup = async(data)=>{
    let response;
    try {
        response = await api.post('/register',data)
    } catch (error) {
        return error;
    }
    return response;
}
export const signout = async()=>{
    let response;
    try {
        response = await api.post('/logout')

    } catch (error) {
        return error;
    }
    return response;
}
export const getAllBlogs = async()=>{
    let response;
    try {
     response = await api.get('/blog/all',);   
    } catch (error) {
        return error;
    }
    return response;
}
export const submitBlog = async(data)=>{
    let response;
    try {
        response  =await api.post('/blog',data)
    } catch (error) {
        return error;
    }
    return response;
}
export const getBlogbyId = async(id)=>{
    let response;
    try {
        response = await api.get(`/blog/${id}`);
    } catch (error) {
        return error; 
    }
    return response;
}

export const getCommentsbyId = async(id)=>{
    let response;
    try {
        response = await api.get(`/comment/${id}`);
    } catch (error) {
        return error; 
    }
    return response;
}
export const postComment = async(data)=>{
    let response;
    try {
        response = await api.post('/comment',data);
    } catch (error) { 
        return error; 
    }
    return response;
}
export const deleteBlog = async(id)=>{
    let response;
    try {
        response = await api.delete(`/blog/${id}`);
    } catch (error) {
        return error; 
    }
    return response;
}
export const EditaBlog = async(data)=>{
     let response;
     try {
        response = await api.put('/blog',data);
     } catch (error) {
        return error; 
    }
    return response;
}
//auto-refresh Token
// check all the protected resource
// refresh Token if token is expired
// carry on the protected resource 

api.interceptors.response.use(
    config=>config,
    async(error)=>{
        const originalRequest = error.config;
        if((error.response.status === 401 || error.response.status === 500) && originalRequest && !originalRequest.isRetry){
            originalRequest.isRetry = true;
            try {
                await axios.get(`${process.env.REACT_APP_INTERNAL_API_PATH}/refresh`,{
                    withCredentials:true
                });
                return api.request(originalRequest);
            } catch (error) {
                return error;
            }
        }
    }
)