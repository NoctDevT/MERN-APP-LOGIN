import  { useState, useEffect } from 'react'

import '../App.css';
import axios from 'axios';
import useDarkMode from '../hooks/useDarkMode';
import Sidebar from '../hooks/Sidebar'


export default function UserPage() {

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
  
  