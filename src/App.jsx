import React, {useEffect, useState} from 'react'
import {HugeiconsIcon} from '@hugeicons/react';
import {Sun01Icon, Moon02Icon} from '@hugeicons/core-free-icons';
import Card from "./components/Card.jsx";

const App = () => {
    const [darkMode, setDarkMode] = useState(localStorage.getItem('theme') === 'dark' || false);
    const [catFacts, setCatFacts] = useState([])
    const [catPics, setCatPics] = useState([])

    const url = `https://api.thecatapi.com/v1/images/search?limit=9&api_key=${import.meta.env.VITE_API_KEY
    }`

    useEffect(() => {
        darkMode ? document.body.classList.add('dark') : document.body.classList.remove('dark');
    }, [darkMode]);

    useEffect(() => {
        localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    }, [darkMode])

    const getCatPics = () => {
        let ignore = false;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (!ignore) {
                    setCatPics(data)
                    console.log(data)
                }
            })
            .catch(error => console.error(error));

        return () => {
            ignore = true;
        };
    }


    const getCatFacts = () => {
        let ignore = false;

        fetch('https://meowfacts.herokuapp.com/?count=9')
            .then(response => response.json())
            .then(data => {
                if (!ignore) {
                    setCatFacts(data.data)
                    console.log(data)
                }
            })
            .catch(error => console.error(error));

        return () => {
            ignore = true;
        };
    }

    const getData = () => {
        getCatFacts();

        getCatPics();
    }

    useEffect(() => {
        getData()
    }, []);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode)
        document.body.classList.toggle('dark');
    }

    return (
        <div>
            <span className='hover:opacity-90 active:opacity-75 cursor-pointer' onClick={() => toggleDarkMode()}>{
                darkMode ? <span className='themeButton'>Light<HugeiconsIcon icon={Sun01Icon} size={40}/></span> :
                    <span className='themeButton'>Dark<HugeiconsIcon icon={Moon02Icon} size={40}/></span>
            }</span>

            <h1 className='text-[50px] text-center font-head'>Kitty Facts :)</h1>

            {
                catFacts.length > 0 ? <ul className='grid gap-8 grid-cols-[repeat(auto-fit,400px)]'>
                        {
                            catFacts.map((fact, i) => <li
                                className='text-2xl text-center w-[75%] max-sm:w-[95%] max-sm:text-[20px] mx-auto mt-7'
                                key={i}>
                                <Card fact={fact} pic={catPics[i]}/>
                            </li>)
                        }
                    </ul> :
                    <p className='text-2xl text-center w-[75%] mx-auto mt-7'>Loading...</p>
            }

            <button onClick={() => getData()}
                    className='text-2xl flex justify-center items-center mx-auto mt-7 py-2 px-4 rounded-md bg-slate-900 text-slate-300 dark:bg-slate-300 dark:text-slate-900 hover:opacity-90 active:opacity-75 cursor-pointer'>New
                Facts
            </button>
        </div>
    )
}
export default App
