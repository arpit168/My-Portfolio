import React from 'react'
import ParticlesBackgroun from '../components/ParticlesBackground'

export default function Home() {
  return (
    <section id='home' className='w-full h-screen relative bg-black overflow-hidden'>
      <ParticlesBackgroun />
      <div className='absolute inset-0'>
        <div className='absolute top-32 left-32 w-[70vw] sm:w-z[500vw] md:w-[40vw] max-w-125  rounded-full *:bg-linear-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-30 sm:opacity-20 md:opacity-10 blur-[100px] sm:blur-[130px] md:blur-[150px] animate-pulse'></div>
        <div></div>
      </div>


    </section>
  )
}