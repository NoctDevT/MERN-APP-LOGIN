import react, { useEffect, useState } from "react";
import useDarkMode from "../hooks/useDarkMode";
import axios from "../axios";

const mockData = [
  { userame: "mockdata1", message: "mockdata message1" },
  { userame: "mockdata2", message: "mockdata message2" },
  { userame: "mockdata3", message: "mockdata message3" },
  { userame: "mockdata4", message: "mockdata message4" },
  { userame: "mockdata5", message: "mockdata message5" },
  { userame: "mockdata6", message: "mockdata message6" },
  { userame: "mockdata7", message: "mockdata message7" },
  { userame: "mockdata8", message: "mockdata message8" },
];

export default function Messages() {
  const [darkMode, setDarkMode] = useDarkMode();

  const [messageArr, setMessageArr] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  async function getData() {
    try {
      const res = await axios.get(`/message/get/messages`);
      setMessageArr(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    getData();
    console.log(messageArr);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
   await axios
        .post(
          `/message/new/message`
          , {message: newMessage},
          {withCredentials: true}
        );

      await getData().then(() => {
        setNewMessage("");
      })
  };

  return (
    <div
      className={`overflow-auto ${darkMode ? "bg-gray-700" : "bg-gray-700"}`}
    >
      <div className="flex flex-col h-screen">
        <div className="h-1/4 flex justify-center items-center">
          <form>
            <input
              type="text"
              className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-transparent focus:outline-none
          focus:ring-0 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 border-none dark:border-gray-700 dark:text-gray-400
           dark:focus:ring-gray-600"
              placeholder="enter message"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button
              className="mt-4 bg-indigo-500 text-white py-2 px-6 rounded-md hover:bg-indigo-600"
              onClick={handleSubmit}
              type="submit"
            >
              Add Message
            </button>
          </form>
        </div>
        <div className="h-3/4 overflow-auto">
          <div className="flex flex-col p-4">
            {messageArr
              ? messageArr.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-4"
                  >
                    <h2 className="font-bold mb-2 text-lg">{item.userName}</h2>
                    <p className="text-gray-700 dark:text-gray-300">
                      {item.messageDetails[0].message}
                    </p>
                  </div>
                ))
              : false}
          </div>
        </div>
      </div>
    </div>
  );
}
