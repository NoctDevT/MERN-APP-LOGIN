import react, { useEffect, useState } from 'react'

export default function useDarkMode() {


    const [dark, setDark] = useState(getMode);

    useEffect(() => {
        localStorage.setItem("dark", JSON.stringify(dark));
    }, [dark]);

    function getMode() {
        const savedmode = JSON.parse(localStorage.getItem("dark"));
        return savedmode || false;
    }


    return [dark, setDark]


}