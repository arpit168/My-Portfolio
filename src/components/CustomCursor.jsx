import React, { useEffect, useState } from 'react'



export default function CustomCursor(){
    const [position , setPosition] = useState({x:0 , y:0})
     useEffect(()=>{
        const moveHandler = (e) = {
            setPosition({x :e.clientX , y :e.clientY})
        };
        window.addEventListener("mousemove", moveHandler)
     })



    return(
        <>
        <div className='pointer-events-none fixed top-0 left-0 z-[9999]'>
            <div className='w-20 h-20 rounded-full bg-gradent-to-r from pink-500 to blue-500 blur-3xl opacity-80'>

            </div>

        </div>
        </>
    )
}
