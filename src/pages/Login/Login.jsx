import React, { useState } from 'react';
import styles from './Login.module.css';
import TextInput from '../../components/TextInput/TextInput';
import LoginSchema from '../../schemas/LoginSchema';
import { useFormik } from 'formik';
import { NavLink, useNavigate} from 'react-router-dom';
import {login} from '../../api/internal';
import {setUser} from '../../store/UserSlice';
import { useDispatch } from 'react-redux';



const Login = () => {
  const [error,setError] = useState('')
  const dispatch = useDispatch();
const navigate = useNavigate();
  //api call for login
  const handleLogin = async()=>{
const data = {
  username:values.username,
  password:values.password
}
const response = await login(data);
if(response.status === 200){
  // 1. set user
const user ={
  _id :response.data.user._id,
  email:response.data.user.email,
  username:response.data.user.username,
  auth:response.data.auth
}
dispatch(setUser(user));
  // 2. redirect 
  navigate('/');

}
  else if(response.code === 'ERR_BAD_REQUEST'){
 setError(response.response.data.message)
  }
}
  //for from validation
  const { values,touched,handleBlur,handleChange,errors} = useFormik({
initialValues:{
  username:'',
  password:''
},
validationSchema:LoginSchema
  })
  return (
    <div className={styles.loginwrapper}>
      <div className={styles.loginheader}>
        Log in to your account
        </div>

        <TextInput 
        type="text"
        value={values.username}
        name="username"
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder="Enter Username"
        error={errors.username && touched.username ? 1 :undefined}
        errormessage={errors.username}
        />
        <TextInput 
         type="password"
        value={values.password}
        name="password"
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder="Enter password"
        error={errors.password && touched.password ? 1 :undefined}
        errormessage={errors.password}/>
        <button onClick={handleLogin} 
        className={styles.LoginButton}
        disabled={!values.username || !values.password || errors.username || errors.password}>Log in</button>
        <span>Don't have an Account? {" "} <NavLink to='/signup' className={styles.createAccount}>Register</NavLink></span>
        {error !=='' &&<p className={styles.errormessage}>{error}</p>}
    </div>
  )
}

export default Login
