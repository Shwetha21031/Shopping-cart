import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function LoginPage() {
    const navigate = useNavigate()
    const [uname , setUname] = useState('')
    const [pwd,setPwd] = useState('')
    

    const userName = useSelector(state=>state.login.userName)
    const passWord = useSelector(state=>state.login.password)

    const handleLogin = () => {
        if(uname === userName && pwd===passWord){
           
           toast.success('Logged in successfully',{
            position: 'top-right',
            autoClose: 1000
            
           })
           navigate('/homePage')
        }else{
            toast.error('incorrect credentials',{
                position: 'top-right',
                autoClose: 1000
            })
        }
    }


    
  return (
    <div className='login-main'>
    <div className='Login-container'>
        <input type='text' placeholder='username' onChange={(e)=>setUname(e.target.value)}/>
<br></br>
        <input type='text' placeholder='password' onChange={(e)=>setPwd(e.target.value)}/>
<br></br>
        <button onClick={handleLogin}>Login</button>
    </div>
    </div>
  )
}

export default LoginPage