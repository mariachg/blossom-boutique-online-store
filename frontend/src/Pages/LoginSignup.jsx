import React, { useState } from 'react'
import './CSS/LoginSignup.css'

function LoginSignup() {

  const [state, setState] = useState("Login")
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: ""
  })

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  //API for the Login-Register page
  const login = async () => {
    console.log("Login Function Executed", formData)
    let responseData

    await fetch('http://localhost:4000/login', {
      method: 'POST', 
      headers: {
        Accept: 'application/json', 
        'Content-Type': 'application/json', 
      }, 
      body: JSON.stringify(formData),
    }).then((response) =>response.json()).then((data)=>responseData=data)

    if(responseData.success){
      localStorage.setItem('auth-token', responseData.token)
      window.location.replace("/")
    }
    else{
      alert(responseData.errors)
    }
  }
  

  const register = async () => {
    console.log("Registration Function Executed", formData)
    let responseData

    await fetch('http://localhost:4000/register', {
      method: 'POST', 
      headers: {
        Accept: 'application/json', 
        'Content-Type': 'application/json', 
      }, 
      body: JSON.stringify(formData),
    }).then((response) =>response.json()).then((data)=>responseData=data)

    if(responseData.success){
      localStorage.setItem('auth-token', responseData.token)
      window.location.replace("/")
    }
    else{
      alert(responseData.errors)
    }
  }

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Register" ? <input name='username' value={formData.username} onChange={changeHandler} type='text' placeholder='Your Name' /> : <></>}
          <input name='email' value={formData.email} onChange={changeHandler} type='email' placeholder='Email Address' />
          <input name='password' value={formData.password} onChange={changeHandler} type='password' placeholder='Password' />
        </div>
        <button onClick={() => { state === 'Login' ? login() : register() }}>Continue</button>
        {state === "Register"
          ? <p className='loginsignup-login'> Already have an account? <span onClick={() => { setState("Login") }} >Login Here</span> </p>
          : <p className='loginsignup-login'> Create an account? <span onClick={() => { setState("Register") }}>Register here</span> </p>
        }
      </div>
    </div>
  )
}

export default LoginSignup