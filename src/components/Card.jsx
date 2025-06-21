import React from 'react'

const Card = ({fact, pic}) => {
    return <div className='shadow-lg flex flex-col items-center justify-center rounded-md w-[350px] dark:bg-slate-300 dark:text-slate-900 bg-slate-900 text-slate-300'>
        <img src={pic?.url} alt='Picture of Cat (Loading...)' className='w-full h-[350px] object-cover rounded-tr-md rounded-tl-md shadow-lg hover:scale-[103%] active:scale-100 transition-all duration-300' />

        <div className='h-[150px] overflow-y-auto mt-3 text-justify w-[90%] mx-auto'>
        <p>{fact}</p>
        </div>
    </div>
}
export default Card
