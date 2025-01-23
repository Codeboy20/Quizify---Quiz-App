import React from 'react'
import { useNavigate } from "react-router-dom";
// import { arrow-long-right } from '@heroicons/react/24/solid'

function Home() {
    let navigate = useNavigate();
    const ToQuizz = () => {
        setTimeout(() =>{
        let path = `/quiz`;
        navigate(path);
    },300)
}
    return (
        <section className='lg:w-9/12 md:w-[90%] px-4 mx-auto mt-12 flex flex-col md:flex-row-reverse justify-between items-center'>

            <div className='md:w-1/2 w-full'>
                <img src='/images/banner.png' alt='banner image' className='w-full mx-auto'></img>
            </div>

            <div className='space-y-7'>
                <h2 className='lg:text-4xl text-3xl font-medium text-[black] md:w-4/6 lg:leading-normal leading-normal mb-3'>Increase your knowledge by giving this Quiz.</h2>
                <p className='py-2 mb-6  font-medium text-gray-700 px-2 border-1-4 border-[#0b7a96]-700 text-base'>Helping people for making their core concept strong.</p>
                <div className='text-lg font-medium mb-7 flex flex-col sm:flex-row gap-5 justify-center mr-56 

                 items-center '>
                    <button className='bg-[#0b7a96] inline-flex px-6 py-2 text-white rounded hover:bg-[white] hover:text-black transition-all duration-300 ease-in '
                        onClick={ToQuizz}> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                        Start Now</button>
                    <button className='px-6 py-2 rounded border mr-16 text-[black]  hover:bg-[#0b7a96] hover:text-white transition-all duration-300 ease-in'>Know more</button>
                </div>
            </div>




        </section>
    )
}

export default Home
