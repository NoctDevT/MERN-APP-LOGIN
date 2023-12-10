import react from 'react'
import useDarkMode from '../hooks/useDarkMode';



export default function Messages() {
  const [darkMode, setDarkMode] = useDarkMode();

  return (
    <div className="flex flex-col h-screen">
      <div className={`overflow-auto ${darkMode ? "bg-slate-700" : "bg-slate-500"}`}>
        <div className="h-1/4 flex">
          <h1>hello</h1>
        </div>

        <div className="h-3/4 overflow-auto">
          <div className="flex flex-col p-4">
            {/* {Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-4"
              >
                <h2 className="font-bold mb-2 text-lg">
                  Card Title {index + 1}
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  This is the content of card number {index + 1}.
                </p>
              </div>
            ))} */}
          </div>
        </div>
      </div>
    </div>
  );
}