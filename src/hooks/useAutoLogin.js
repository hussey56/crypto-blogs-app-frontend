import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import {setUser} from '../store/UserSlice'
import { useDispatch } from 'react-redux'
import axios from 'axios'

const useAutoLogin = () => {
    const [loading,setLoading] = useState(true);
const dispatch = useDispatch();
    useEffect(()=>{
        (async function autoLoginApiCall(){
            try {
                const response = await axios.get(`${process.env.REACT_APP_INTERNAL_API_PATH}/refresh`,{
                    withCredentials:true
                });
                if(response.status === 200){
                    const user ={
                        _id :response.data.user._id,
                        email:response.data.user.email,
                        username:response.data.user.username,
                        auth:response.data.auth
                      }
                      dispatch(setUser(user));
                }
            } catch (error) {
                
            }finally{
setLoading(false);
            }
           
            
        })();

    },[]);

    return loading;

}

export default useAutoLogin
