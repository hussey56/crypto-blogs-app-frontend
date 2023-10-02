import {React,useState} from 'react'
import styles from './Signup.module.css'
import SignupSchema from '../../schemas/SignupSchema'
import {useFormik} from 'formik'
import TextInput from '../../components/TextInput/TextInput'
import { NavLink, useNavigate } from 'react-router-dom'
import {setUser} from '../../store/UserSlice';
import { useDispatch } from 'react-redux'
import { signup } from '../../api/internal'
const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error,setError] = useState('');

    const HandleSignUp = async()=>{
const data = {
    name:values.name,
    username:values.username,
    email:values.email,
    password:values.password,
    confirmPassword:values.confirmPassword
}
   const response = await signup(data);
   if(response.status === 201){
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
   }  else if(response.code === 'ERR_BAD_REQUEST'){
    setError(response.response.data.message)
     }

    }
    const {values,handleBlur,handleChange,touched,errors} = useFormik({
initialValues:{
name:"",
username:"",
email:"",
password:"",
confirmPassword:""
},
validationSchema:SignupSchema
    })
  return (
    <div className={styles.signupwrapper}>
      <div className={styles.signupheader}>
        Create an Account
      </div>
      <TextInput type="text" name="name" value={values.name} onChange={handleChange} onBlur={handleBlur} placeholder="name" error={errors.name && touched.name ? 1 :undefined } errormessage={errors.name}/>
      <TextInput type="text" name="username" value={values.username} onChange={handleChange} onBlur={handleBlur} placeholder="username" error={errors.username && touched.username ? 1 :undefined } errormessage={errors.username}/>
      <TextInput type="email" name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} placeholder="email" error={errors.email && touched.email ? 1 :undefined } errormessage={errors.email}/>
      <TextInput  type="password" name="password" value={values.password} onChange={handleChange} onBlur={handleBlur} placeholder="password" error={errors.password && touched.password ? 1 :undefined } errormessage={errors.password}/>
      <TextInput type="password" name="confirmPassword" value={values.confirmPassword} onChange={handleChange} onBlur={handleBlur} placeholder="Confirm Password" error={errors.confirmPassword && touched.confirmPassword ? 1 :undefined } errormessage={errors.confirmPassword}/>
      <button
       onClick={HandleSignUp}
        className={styles.SignupButton}
        disabled={!values.name || !values.email || !values.username || !values.password || !values.confirmPassword || errors.name || errors.email || errors.username || errors.password || errors.confirmPassword}
        >Sign Up</button>
        <span>Already have an Account? {" "} <NavLink to='/login' className={styles.LoginAccount}>Loin Here</NavLink></span>
        {error !=='' &&<p className={styles.errormessage}>{error}</p>}
    </div>
  )
}

export default Signup
