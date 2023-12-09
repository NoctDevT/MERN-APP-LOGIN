import  { useState, useEffect  } from 'react'

import '../App.css';
import axios from 'axios';


export default function Home() {

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
  