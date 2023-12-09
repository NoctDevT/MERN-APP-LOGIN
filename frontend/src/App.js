import react, { useState, useRef, useEffect, useLayoutEffect } from 'react'

import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import queryString from "query-string"

import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom'



import { BsPlus, BsGearFill, BsFillLightningFill, BsSearch } from 'react-icons/bs'
import { FaFire, FaPoo, FaSearch } from 'react-icons/fa'
import { MdAccountCircle, MdHome, MdMail, MdManageSearch } from 'react-icons/md'
import useDarkMode from './hooks/useDarkMode';
// import useDarkMode from './hooks/useDarkMode';


function App() {



  return (
    <>
      <Router>
        <Sidebar />

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/Users" element={<UserPage />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />


        </Routes>

      </Router>

    </>
  )
}



function ForgotPassword() {

  const [backendResponse, setBackendResponse] = useState()
  const [email, setEmail] = useState()

  const handleEmailInput = (e) => {
    e.preventDefault()
    setEmail(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()


    axios.post('/user/sendResetEmail', { email: email }, { withCredentials: true }).then(Response => {
      setBackendResponse(Response.data.message);
    }).catch((error) => {
      let errMsg = error.response.data.message.replaceAll("\"", '')
      setBackendResponse(errMsg)
    })

  }


  return (
    <div className="min-h-screen text-gray-300 bg-gray-700 py-6 flex flex-col justify-center 
    sm:py-12">
      <div className="relative py-3 sm:w-96 mx-auto text-center" >
        <span className="text-2xl"> Password Reset </span>
        <div className="text-1xl text-gray-500"> {backendResponse} </div>

        <div className="mt-6 bg-white shadow-md rounded-lg">

          <div className="h-2 bg-indigo-400 rounded-t-md "> </div>
          <div className='px-8 py-6'>

            <label className='block text-gray-600 font-semibold mt-1'> Enter your email </label>
            <input type="email" value={email} onChange={handleEmailInput} placeholder='Email' className='border w-full h-5 px-3 py-5 mt-2 text-gray-900 hover:outline-none focus:outline-none  focus:ring-1 focus:ring-indigo-300 rounded-md' />

            <div className="flex justify-center items-baseline">
              <button type="submit" onClick={handleSubmit} className="mt-4 bg-indigo-500 text-white py-2 px-6 rounded-md hover:bg-indigo-600 center" > Send </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}





function ResetPassword() {



  const queryParams = queryString.parse(window.location.search)

  const resetToken = queryParams.token
  const email = queryParams.email

  const [backendResponse, setBackendResponse] = useState('')
  const [password, setPassword] = useState()

  const handlePasswordInput = (e) => {
    e.preventDefault();

    setPassword(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('/user/resetPassword', { email: email, password: password, token: resetToken }, { withCredentials: true }).then(Response => {
      setBackendResponse(Response.data.message + ' redirecting you to home');
    }).catch((err) => {
      setBackendResponse(err.data.message);

    })



  }

  return (
    <div className="min-h-screen text-gray-300 bg-gray-700 py-6 flex flex-col justify-center 
    sm:py-12">
      <div className="relative py-3 sm:w-96 mx-auto text-center" >
        <span className="text-2xl"> Password Reset </span>
        <div className="text-1xl text-gray-500"> {backendResponse} </div>

        <div className="mt-6 bg-white shadow-md rounded-lg">

          <div className="h-2 bg-indigo-400 rounded-t-md "> </div>
          <div className='px-8 py-6'>

            <label required className='block text-gray-800 font-semibold mt-1'> Password </label>
            <input required value={password} onChange={handlePasswordInput} type="password" placeholder='Password' className='border w-full h-5 px-3 py-5 mt-2 
            text-gray-900
             hover:outline-none focus:outline-none  focus:ring-1 focus:ring-indigo-300 rounded-md' />

            <div className="flex justify-center items-baseline">
              <button type="submit" onClick={handleSubmit} className="mt-4 bg-indigo-500 text-white py-2 px-6 rounded-md hover:bg-indigo-600 center" > Send </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}






function Login() {



  // const CheckLogin = () => {
  //   axios.get('/user/account/signedin', { withCredentials: true }).then(Response => {
  //     return Response;
  //   }).catch((error) => {
  //     return error
  //   })
  // }


  // console.log(CheckLogin())


  let navigate = useNavigate();

  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  const [backendResponse, setBackendResponse] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });


  const handleUsernameInput = (e) => {
    e.preventDefault();
    setFormData({ ...formData, email: e.target.value })
  }
  const handlePasswordInput = (e) => {
    e.preventDefault();
    setFormData({ ...formData, password: e.target.value })
  }

  const handleSubmit = () => {
    if (!formData.email) return setBackendResponse('Please enter your email')
    if (!formData.password) return setBackendResponse('Please enter your password')

    axios.post('/user/login', { email: formData.email, password: formData.password }, { withCredentials: true }).then(Response => {
      setBackendResponse(Response.data.message + ' redirecting you to home');
      setTimeout(() => {
        navigate(Response.data.redirectUrl);
      }, 1500)

    }).catch((error) => {
      let errMsg = error.response.data.message.replaceAll("\"", '')
      setBackendResponse(errMsg)
    })

  }

  return (

    <div className="min-h-screen text-gray-300 bg-gray-700 py-6 flex flex-col justify-center 
          sm:py-12">
      <div className="relative py-3 sm:w-96 mx-auto text-center" >
        <span className="text-2xl"> Login to your account </span>
        <div className="text-1xl text-gray-500"> {backendResponse} </div>

        <div className="mt-6 bg-white shadow-md rounded-lg text-left">

          <div className="h-2 bg-indigo-400 rounded-t-md "> </div>
          <div className='px-8 py-6'>
            <label className='block text-gray-600 font-semibold mt-1'> Email </label>
            <input type="text" value={formData.email} onChange={handleUsernameInput} placeholder='Email' className='border w-full h-5 px-3 py-5 mt-2 text-gray-900 hover:outline-none focus:outline-none  focus:ring-1 focus:ring-indigo-300 rounded-md' />

            <label required className='block text-gray-600 font-semibold mt-1'> Password </label>
            <input required value={formData.password} onChange={handlePasswordInput} type="password" placeholder='Password' className='border w-full h-5 px-3 py-5 mt-2 text-gray-900 hover:outline-none focus:outline-none  focus:ring-1 focus:ring-indigo-300 rounded-md' />

            <div className="flex justify-between items-baseline">
              <button type="submit" onClick={handleSubmit} className="mt-4 bg-indigo-500 text-white py-2 px-6 rounded-md hover:bg-indigo-600" > Login </button>
              <Link to='/forgotPassword'>
                <div className="text-sm hover:underline text-gray-700"> Forgot Password? </div>   </Link>
            </div>

          </div>
        </div>

        <span className="text-1xl mt-2">Don't have an account?
          <Link className='text-indigo-400' to="/Register"> Sign up </Link>
        </span>

      </div>
    </div>

  )
}







function Register() {
  let navigate = useNavigate();
  const [backendResponse, setBackendResponse] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: ''
  });

  const handleEmailInput = (e) => {
    e.preventDefault();
    setFormData({ ...formData, email: e.target.value })
  }
  const handlePasswordInput = (e) => {
    e.preventDefault();
    setFormData({ ...formData, password: e.target.value })
  }

  const handleUsernameInput = (e) => {
    e.preventDefault();
    setFormData({ ...formData, username: e.target.value })
  }



  const handleSubmit = () => {
    if (!formData.username) return setBackendResponse('Please enter your username')
    if (!formData.email) return setBackendResponse('Please enter your email')
    if (!formData.password) return setBackendResponse('Please enter your password')


    axios.post('/user/register', { username: formData.username, email: formData.email, password: formData.password, }, { withCredentials: true }).then(Response => {
      setBackendResponse(Response.data.message + ' redirecting you to home');
      setTimeout(() => {
        navigate(Response.data.redirectUrl);
      }, 1500)
    }).catch((error) => {


      let errMsg = error.response.data.message.replaceAll("\"", '')
      setBackendResponse(errMsg)
    })
  }




  return (
    <div className="min-h-screen text-gray-300 bg-gray-700 py-6 flex flex-col justify-center 
    sm:py-12">
      <div className="relative py-3 sm:w-96 mx-auto text-center" >
        <span className="text-2xl"> Register </span>
        <div className="text-1xl text-gray-500"> {backendResponse} </div>

        <div className="mt-6 bg-white shadow-md rounded-lg text-left">

          <div className="h-2 bg-indigo-400 rounded-t-md "> </div>
          <div className='px-8 py-6'>

            <label required className='block text-gray-600 font-semibold mt-1'> Username </label>
            <input required value={formData.username} onChange={handleUsernameInput} type="text"
              placeholder='username' className='border w-full h-5 px-3 py-5 mt-2 text-gray-900 hover:outline-none focus:outline-none  focus:ring-1 focus:ring-indigo-300 rounded-md' />


            <label className='block text-gray-600 font-semibold mt-1'> Email </label>
            <input type="text" value={formData.email} onChange={handleEmailInput} placeholder='Email' className='border w-full h-5 px-3 py-5 mt-2 text-gray-900 hover:outline-none 
            focus:outline-none  focus:ring-1 focus:ring-indigo-300 rounded-md' />

            <label required className='block text-gray-600 font-semibold mt-1'> Password </label>
            <input required value={formData.password} onChange={handlePasswordInput} type="password" placeholder='Password' className='border w-full h-5 px-3 py-5 mt-2 text-gray-900
             hover:outline-none focus:outline-none  focus:ring-1 focus:ring-indigo-300 rounded-md' />



            <div className="flex justify-between items-baseline">
              <button type="submit" onClick={handleSubmit} className="mt-4 bg-indigo-500 text-white py-2 px-6 rounded-md hover:bg-indigo-600" > Register </button>
              <Link to='/Register'>
                <div className="text-sm hover:underline text-gray-700"> Forgot Password? </div>   </Link>
            </div>

          </div>
        </div>
        <span className="text-1xl mt-2">Have an account?
          <Link className='text-indigo-400' to="/Login"> Sign In </Link>
        </span>

      </div>
    </div>
  )
}













function Home() {

  const [userList, setUserList] = useState([]);
  const [recentUsers, setRecentUser] = useState([]);

  const getUserList = () => {
    axios.get(`/get/userList`).then((res) => {
      setUserList(res.data)
    })
  }

  const RecentMessages = () => {
    if (userList.length < 1) return null

    var INDEX = 0;

    userList.forEach((x, i) => {
      if (INDEX <= 3) {
        setRecentUser((oldArray) => [...oldArray, x])
        INDEX++;
      }
    })
  }

  useEffect(() => {
    getUserList();
    RecentMessages();
  }, [])

  return (
    <div className="flex h-screen justify-center items-center bg-gray-700">
      <div>
        <h1 className="text-center align-middle font-bold text-white">
          Last Message
        </h1>





      </div>
    </div >
  )
}










function UserPage() {

  const [data, setData] = useState()
  const [input, setInput] = useState();

  const [messages, setMessages] = useState([]);
  const [userList, setUserList] = useState([]);

  const [selectedUser, setSelectedUser] = useState()



  const getUserList = (userId) => {
    axios.get(`/get/userList`).then((res) => {
      setUserList(res.data)
    })
  }

  const getMessageFromUser = (USERID) => {
    axios.post(`/get/messages?id=${USERID}`).then((res) => {
      setMessages(res.data)
    }
    );
  }


  const [dark, setDark] = useDarkMode();

  const handleDarkMode = () => {
    setDark((prevMode) => !prevMode)
  }


  useEffect(() => {
    getUserList();
    if (selectedUser) getMessageFromUser(selectedUser)
  }, [selectedUser])

  return (
    // <div className="App">
    <div className={dark ? 'dark' : ''}>

      <button style={{ left: 0 }} onClick={handleDarkMode}>hiii im a busddddddtton </button>

      <ul className="">
        {userList.map((user, key) => {
          return <li key={key}
            onClick={() => { setSelectedUser(user.id) }}
            style={{ cursor: 'pointer', listStyle: "none" }}
          >{
              // "ID: " + user.id + 
              " Name: " + user.name}</li>
        })}
      </ul >

      <Sidebar />

      {/* </div> */}
    </div >
  );
}




function Sidebar() {

  const Wrapper = ({ childrenm }) => <div> </div>


  return (
    <div className='fixed top-0 left-0 h-screen w-[6rem] m-0 
    flex flex-col 
    bg-gray-900 text-white shadow-lg   dark:bg-slate-200 transition-all duration-700 ' >
      {/* <li>A</li>
      <li>A</li>
      <li>A</li>
      <li>A</li> */}




      <SidebarIcon icon={<MdManageSearch size="28" />} text={"search"} navigation="/" />
      <SidebarIcon icon={<MdAccountCircle size="28" />} text={"Users"} navigation="/Users" />
      <SidebarIcon icon={<MdMail size="28" />} text={'Messages'} navigation="/Messages" />
      <SidebarIcon icon={<MdHome size="28" />} text={'Login'} navigation="/Login" />


    </div>

  )
}






const SidebarIcon = ({ icon, text = "tooltip 💡", navigation }) => {
  return (
    <Link to={navigation}>
      <div className="sidebar-icon group">
        {icon}

        <span className="sidebar-tooltip group-hover:scale-100">
          {text}
        </span>
      </div>
    </Link>
  )

}







export default App;
