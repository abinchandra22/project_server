import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import auth from '../assets/auth.png'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { loginAPI, registerAPI } from '../services/allAPI';
import Spinner from 'react-bootstrap/Spinner';
import { tokenAuthContext } from '../context/TokenShare';
function Auth({ insideRegister }) {
  const{isAuthorised,setIsAuthorised} = useContext(tokenAuthContext)
  // spinner
  const [loginStatus, setLoginStatus] = useState(false)


  const navigate = useNavigate()
  // console.log(insideRegister);
  // creating an hook for getting the values withie typing
  const [userInputData, setUserInputData] = useState({
    username: "", email: "", password: ""
  })

  // button
  const handleRegister = async (e) => {
    // to prevent autoreloding in form
    e.preventDefault()
    //  console.log(userInputData);
    const { username, email, password } = userInputData
    if (!username || !email || !password) {
      toast.info("please fill the form complete!!!")
    }
    else {
      try {
        const result = await registerAPI(userInputData)
        // while putting this log we can get datas
        console.log(result);
        if (result.status === 200) {
          toast.warning(`Welcome ${result.data.username}...Please login to explore your site..`)
          setUserInputData({ username: "", email: "", password: "" })
          // navigate to loginpage
          setTimeout(() => {
            navigate('/login')
          }, 200)
        } else {
          toast.error(result.response.data)
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  // login button
  const handleLogin = async (e) => {
    // to prevent autoreloding in form
    e.preventDefault()
    //  console.log(userInputData);
    const { email, password } = userInputData
    if (!email || !password) {
      toast.info("please fill the form complete!!!")
    }
    else {
      try {
        const result = await loginAPI({ email, password })
        // while putting this log we can get datas
        console.log(result);
        if (result.status === 200) {
          // store token,username using sessionstorage
          sessionStorage.setItem("username", result.data.existingUser.username)
          sessionStorage.setItem("token", result.data.token)
          // convert to string
          sessionStorage.setItem("userdetails",JSON.stringify(result.data.existingUser))
          // loading....
          setLoginStatus(true)
          setIsAuthorised(true)

          // navigate to landingpage
          setTimeout(() => {
            setUserInputData({ email: "", password: "" })

            navigate("/")
            setLoginStatus(false)
          }, 2000)
        } else {
          toast.error(result.response.data)
        }
      } catch (err) {
        console.log(err);
      }
    }
  }


  return (
    <div style={{ width: '100%', height: '100vh' }} className='d-flex justify-content-center align-items-center'>
      <div className='container w-75'>
        <ToastContainer autoClose={3000} theme='colored'></ToastContainer>
        <Link to={'/'} style={{ textDecoration: 'none' }}><i class="fa-solid fa-arrow-left fa-beat"></i><b>Back To Home</b></Link>
        <div className='card shadow p-5 ' style={{ backgroundColor: '#1be032' }}>
          <div className='row align-items-center'>
            <div className='col-lg-6'>
              <img className='w-100' src={auth} alt="" />
            </div>
            <div className='col-lg-6'>
              <h1 className='fw-bolder text-light mt-2'>
                <i style={{ height: '40px' }} className='fa-solid fa-hands-holding-circle'></i>
                Project Fair
              </h1>
              {/* condition rendering*/}
              <h5 className='fw-bolder text-light mt-2'>
                Sign {insideRegister ? 'Up' : 'In'} to your Account
              </h5>
              <Form>
                {
                  insideRegister &&
                  <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Control type="text" placeholder="Enter User Name" value={userInputData.username} onChange={e => setUserInputData({ ...userInputData, username: e.target.value })} />
                  </Form.Group>
                }
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control type="email" placeholder="Enter email" value={userInputData.email} onChange={e => setUserInputData({ ...userInputData, email: e.target.value })} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Control type="password" placeholder="Password" value={userInputData.password} onChange={e => setUserInputData({ ...userInputData, password: e.target.value })} />
                </Form.Group>
                {
                  insideRegister ?
                    <div>
                      <button onClick={handleRegister} className='btn btn-light mb-2'>Register</button>
                      <p>Allready have an Account? Click here to <Link to={'/login'} className='text-danger'>Login</Link></p>
                    </div> :
                    <div>
                      <button onClick={handleLogin} className='btn btn-light mb-2'>Login {loginStatus && <Spinner animation="border" variant="danger" />} </button>
                      <p>If yoy are a New User? Click here to <Link to={'/register'} className='text-danger'>Register</Link></p>
                    </div>
                }
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth