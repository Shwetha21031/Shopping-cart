import React from 'react'
import axios from 'axios'
function LoginDetails() {
    const users = axios.get('https://jsonplaceholder.typicode.com/users')
.then((res)=>{
   console.log(res.data)
})
.catch((err)=>{
    throw err
})
  return (
    <></>
  )
}

export default LoginDetails