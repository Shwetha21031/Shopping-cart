import { useState } from 'react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { registerUser } from '../../Redux/loginSlice'
import './RegisterUser.css'
function RegisterUser() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [newUser,setNewUser] = useState({
        username:'',
        password: ''
    })

    const handleBackToLogin = () => {
        navigate('/')
    }

    const handleNewRegister = () => {
        const validPwd = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(newUser.password);
        if (validPwd) {
            dispatch(registerUser(newUser))
          toast.success('registered user successfully.',{
            position: 'top-right',
            autoClose: 1000
        });
        navigate('/')
        } else {
          toast.error(`Password must contain at least 8 characters, 
          one letter, 
          one digit, 
          and one special character (@$!%*?&).`);
          setNewUser({
            username:'',
            password: ''
        })
        }   
      };

  return (
    <>
   <div className='register-main'>
    <div className='register-container'>
        <input type='text' placeholder='enter username' onChange={(e)=>setNewUser({...newUser,username: e.target.value})}/>
<br></br>
        <input type='text' placeholder='enter password' onChange={(e)=>setNewUser({...newUser,password:e.target.value})}/>
<br></br>
        <button onClick={handleNewRegister}>Register</button>
        <br></br>
        <button onClick={handleBackToLogin}>Back to login</button>
    </div>
    </div>
    </>
  )
}

export default RegisterUser